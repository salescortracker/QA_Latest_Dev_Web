import { Component, OnInit } from '@angular/core';
import { AccountType } from '../admin/servies/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin/servies/admin.service';

@Component({
  selector: 'app-bank-detail',
standalone: true,
imports: [CommonModule, FormsModule],

  templateUrl: './bank-detail.component.html',
  styleUrl: './bank-detail.component.css'
})
export class BankDetailComponent implements OnInit {
  // Properties
  accountType: AccountType = this.getEmptyAccountType();
  accountTypes: AccountType[] = [];
  companies: any[] = [];
  regions: any[] = [];
  companyMap: { [key: number]: string } = {};
  regionMap: { [key: number]: string } = {};

  // UI State
  isEditMode = false;
  showUploadPopup = false;
  searchText = '';
  statusFilter: boolean | '' = '';
  currentPage = 1;
  pageSize = 10;

  // User & Context
  userId: number = sessionStorage.getItem('UserId') ? Number(sessionStorage.getItem('UserId')) : 0;
  companyId: number = sessionStorage.getItem('CompanyId') ? Number(sessionStorage.getItem('CompanyId')) : 0;
  regionId: number = sessionStorage.getItem('RegionId') ? Number(sessionStorage.getItem('RegionId')) : 0;
  constructor(
    private adminservice: AdminService,
    private spinner: NgxSpinnerService
  ) {}

 ngOnInit(): void {
  this.accountType.companyId = this.companyId;
  this.accountType.regionId = this.regionId;

  this.loadCompanies();
  this.loadRegions();
    this.loadAccountTypes();   // <-- ADD THIS

}

  // ------------------------------------------------------------
  // 🔹 Empty Model
  // ------------------------------------------------------------
  getEmptyAccountType(): AccountType {
    return {
      accountTypeId: 0,
      accountTypeName: '',
      description: '',
      isActive: true,
      companyId: 0,
      regionId: 0,
      companyName: '',
      regionName: '',
      userId: sessionStorage.getItem('UserId') ? Number(sessionStorage.getItem('UserId')) : 0
    };
  }

  // ------------------------------------------------------------
  // 🔹 Load Account Types
  loadAccountTypes(): void {
  this.spinner.show();

  this.adminservice
    .getAccountTypes(
      this.userId,
      this.companyId,
      this.regionId

    )
    .subscribe({
      next: (res: any) => {
        this.accountTypes = res.data.data|| [];
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        Swal.fire('Error', 'Failed to load account types.', 'error');
      }
    });
}


  // ------------------------------------------------------------
  // 🔹 Submit (Add / Update)
  // ------------------------------------------------------------
  onSubmit(): void {
    debugger;
    this.spinner.show();
    if (this.isEditMode) {
      this.adminservice.upateAccountType(this.accountType).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          debugger;
          if (res.message.toLowerCase().includes('duplicate record found')) {
            Swal.fire('warning', res.message, 'warning');
            return;
          }
          Swal.fire('Success', `${this.accountType.accountTypeName} updated successfully!`, 'success');
          this.loadAccountTypes();
          this.resetForm();
        },
        error: () => {
          this.spinner.hide();
          Swal.fire('Error', 'Update failed. Please contact IT Administrator.', 'error');
        }
      });
    } else {
      this.adminservice.createAccountType(this.accountType).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          debugger;
          if (res.message.toLowerCase().includes('duplicate record found')) {
            Swal.fire('warning', res.message, 'warning');
            return;
          }
          Swal.fire('Success', `${this.accountType.accountTypeName} added successfully!`, 'success');
          this.loadAccountTypes();
          this.resetForm();
        },
        error: () => {
          this.spinner.hide();
          Swal.fire('Error', 'Create failed. Please contact IT Administrator.', 'error');
        }
      });
    }
  }

  // ------------------------------------------------------------
  // 🔹 Edit Account Type
  // ------------------------------------------------------------
  editAccountType(g: AccountType): void {
    this.accountType = { ...g };
    this.isEditMode = true;
  }

  // ------------------------------------------------------------
  // 🔹 Delete Account Type
  // ------------------------------------------------------------
  deleteAccountType(g: AccountType): void {
    Swal.fire({
      title: `Are you sure you want to delete ${g.accountTypeName}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.adminservice.deleteAccountType(g.accountTypeId).subscribe({
          next: () => {
            this.spinner.hide();
            Swal.fire('Deleted!', `${g.accountTypeName} deleted successfully.`, 'success');
            this.loadAccountTypes();
          },
          error: () => {
            this.spinner.hide();
            Swal.fire('Error', 'Delete failed! Please contact IT Administrator.', 'error');
          }
        });
      }
    });
  }

  // ------------------------------------------------------------
  // 🔹 Reset Form
  // ------------------------------------------------------------
  resetForm(): void {
    this.accountType = this.getEmptyAccountType();
    this.isEditMode = false;
  }

  // ------------------------------------------------------------
  // 🔹 Filter & Search
  // ------------------------------------------------------------
  filteredAccountTypes(): AccountType[] {
    const search = this.searchText.toLowerCase();
    return this.accountTypes.filter(g => {
      const matchesSearch = g.accountTypeName.toLowerCase().includes(search);
      const matchesStatus = this.statusFilter === '' || g.isActive === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  // ------------------------------------------------------------
  // 🔹 Pagination
  // ------------------------------------------------------------
  get totalPages(): number {
    return Math.ceil(this.filteredAccountTypes().length / this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  changePageSize(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
  }

  // ------------------------------------------------------------
  // 🔹 Export (Excel / PDF)
  // ------------------------------------------------------------
  exportAs(type: 'excel' | 'pdf') {
    if (type === 'excel') this.exportExcel();
    else this.exportPDF();
  }

  exportExcel() {
    const exportData = this.accountTypes.map(g => ({
      'Account Type Name': g.accountTypeName,     
      'Status': g.isActive ? 'Active' : 'Inactive'
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Account Types');
    XLSX.writeFile(wb, 'AccountTypeList.xlsx');
  }

  exportPDF() {
    const doc = new jsPDF();
    const exportData = this.accountTypes.map(g => [
      g.accountTypeName,    
      g.isActive ? 'Active' : 'Inactive'
    ]);
    autoTable(doc, {
      head: [['Account Type Name', 'Description', 'Status']],
      body: exportData
    });
    doc.save('AccountTypeList.pdf');
  }

  // ------------------------------------------------------------
  // 🔹 Bulk Upload
  // ------------------------------------------------------------
  accountTypeModel: any = {
    accountTypeName: 'Savings',
    description: 'Default Account Type Example',
    isActive: true
  };

  onBulkUploadComplete(data: any): void {
    if (data && data.length > 0) {
      this.adminservice.bulkInsertData('AccountType', data).subscribe({
        next: () => {
          Swal.fire('Success', 'Account Types uploaded successfully!', 'success');
          this.loadAccountTypes();
          this.closeUploadPopup();
        },
        error: () => Swal.fire('Error', 'Failed to upload account types.', 'error')
      });
    } else {
      Swal.fire('Info', 'No valid data found in uploaded file.', 'info');
    }
  }

  openUploadPopup() {
    this.showUploadPopup = false;
    setTimeout(() => (this.showUploadPopup = true), 0);
  }

  closeUploadPopup() {
    this.showUploadPopup = false;
  }

  // ------------------------------------------------------------
  // 🔹 Sorting
  // ------------------------------------------------------------
  sortColumn: string = 'accountTypeId';
  sortDirection: 'asc' | 'desc' = 'desc';

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    this.accountTypes.sort((a: any, b: any) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  // ------------------------------------------------------------
  // 🔹 Paginated Account Types 
  // ------------------------------------------------------------
    get pagedAccountTypes(): AccountType[] {
    const sorted = [...this.filteredAccountTypes()];
    this.applySorting();
    const start = (this.currentPage - 1) * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }

  
 loadCompanies(): void {
  this.adminservice.getCompanies(null,this.userId).subscribe({
    next: (res: any[]) => {
      this.companies = res;

      if (this.companyId) {
        this.accountType.companyId = this.companyId;
      }
      

      this.loadAccountTypes();
    }
  });
}


loadRegions(): void {
  this.adminservice.getRegions(null,this.userId).subscribe({
    next: (res: any[]) => {
      this.regions = res;
      this.regionMap = {};
      this.regions.forEach((r:any) => {
        this.regionMap[r.regionID] = r.regionName;
              this.loadAccountTypes();   // ✅ ADD THIS

      });
    },
    error: () => Swal.fire('Error', 'Failed to load regions.', 'error')
  });
}
}

