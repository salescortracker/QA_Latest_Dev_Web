import { Component, OnInit } from '@angular/core';
import { AdminService, Company, PolicyCategory, Region } from '../../../servies/admin.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-policy-category',
  standalone: false,
  templateUrl: './policy-category.component.html',
  styleUrls: ['./policy-category.component.css']
})
export class PolicyCategoryComponent implements OnInit {

  searchText = '';
  list: PolicyCategory[] = [];
  policy!: PolicyCategory;

  companies: Company[] = [];
  regions: Region[] = [];

  attendanceCategories: any[] = [];

  companyMap: Record<number, string> = {};
  regionMap: Record<number, string> = {};

  userId!: number;
  companyId!: number;
  regionId!: number;

  isEditMode = false;

  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("UserId"));
    this.companyId = Number(sessionStorage.getItem("CompanyId"));
    this.regionId = Number(sessionStorage.getItem("RegionId"));

    this.resetFormSilent();
    this.loadCompanies();
    this.loadList();
    this.loadAttendanceCategories();
  }

  // ✅ Reset Form with confirmation
  resetForm() {
    Swal.fire({
      title: "Reset Form?",
      text: "All data will be cleared",
      icon: "question",
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) this.resetFormSilent();
    });
  }

  // Internal silent reset (used after submit or edit)
  resetFormSilent() {
    this.policy = {
      PolicyCategoryID: 0,
      companyId: this.companyId,
      regionId: this.regionId,
      PolicyCategoryName: '',
      description: '',
      isActive: true
    };
    this.isEditMode = false;
  }

  // Load all companies
  loadCompanies() {
    this.adminService.getCompanies(null, this.userId).subscribe({
      next: (res: Company[]) => {
        this.companies = res || [];
        this.companyMap = {};
        this.companies.forEach(c => this.companyMap[c.companyId] = c.companyName);
        this.loadRegions();
      },
      error: () => Swal.fire("Error", "Failed to load companies", "error")
    });
  }

  // Load regions
  loadRegions() {
    this.adminService.getRegions(null, this.userId).subscribe({
      next: (res: Region[]) => {
        const all = res || [];
        this.regionMap = {};
        all.forEach(r => this.regionMap[r.regionID] = r.regionName);

        this.regions = all.filter(r => r.companyID == this.companyId);
        if (!this.regionId && this.regions.length > 0) this.regionId = this.regions[0].regionID;

        this.policy.regionId = this.regionId;
        this.loadAttendanceCategories();
      },
      error: () => Swal.fire("Error", "Failed to load regions", "error")
    });
  }

  // Reload when company changes
  onCompanyChange() {
    this.regionId = 0;
    this.loadRegions();
  }

  // Reload when region changes
  onRegionChange() {
    this.policy.regionId = this.regionId;
    this.loadAttendanceCategories();
  }

  // Load attendance categories for selected company/region
  loadAttendanceCategories() {
    if (!this.companyId || !this.regionId) return;
    this.adminService.getAttendancePolicyCategories(this.companyId, this.regionId)
      .subscribe({
        next: (res: any) => {
          this.attendanceCategories = res.data || [];
        },
        error: () => Swal.fire("Error", "Failed to load Attendance categories", "error")
      });
  }

  // Load Policy Categories
  loadList() {
    this.spinner.show();
    this.adminService.getPolicyCategories(this.companyId, this.regionId).subscribe({
      next: (res: any) => {
        const data = res.data || [];
        this.list = data.map((x: any) => ({
          PolicyCategoryID: x.policyCategoryId,
          companyId: x.companyId,
          regionId: x.regionId,
          PolicyCategoryName: x.policyCategoryName,
          description: x.description,
          isActive: x.isActive
        }));
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        Swal.fire("Error", "Failed to load policy categories", "error");
      }
    });
  }

  // Submit (Create / Update)
  onSubmit() {
    this.policy.companyId = this.companyId;
    this.policy.regionId = this.regionId;
    this.policy.userId = this.userId;

    this.spinner.show();

    const obs = this.isEditMode
      ? this.adminService.updatePolicyCategory(this.policy.PolicyCategoryID!, this.policy)
      : this.adminService.createPolicyCategory(this.policy);

    obs.subscribe({
      next: () => {
        this.spinner.hide();
        Swal.fire(
          this.isEditMode ? "Updated!" : "Added!",
          `Policy Category ${this.isEditMode ? "updated" : "created"} successfully.`,
          "success"
        );
        this.loadList();
        this.resetFormSilent();
      },
      error: () => {
        this.spinner.hide();
        Swal.fire("Error", "Operation failed", "error");
      }
    });
  }

  // Edit Policy Category
  edit(p: PolicyCategory) {
    this.policy = { ...p };
    this.companyId = p.companyId;
    this.regionId = p.regionId;
    this.loadRegions();
    this.loadAttendanceCategories();
    this.isEditMode = true;
  }

  // Delete Policy Category
  delete(p: PolicyCategory) {
    Swal.fire({
      title: `Delete "${p.PolicyCategoryName}"?`,
      icon: "warning",
      showCancelButton: true
    }).then(r => {
      if (!r.isConfirmed) return;
      this.spinner.show();
      this.adminService.deletePolicyCategory(p.PolicyCategoryID).subscribe({
        next: () => {
          this.spinner.hide();
          Swal.fire("Deleted!", "Policy Category deleted.", "success");
          this.loadList();
        },
        error: () => {
          this.spinner.hide();
          Swal.fire("Error", "Delete failed", "error");
        }
      });
    });
  }

  // Filter list based on search text
  filteredList(): PolicyCategory[] {
    const search = this.searchText.toLowerCase();
    return this.list.filter(x => x.PolicyCategoryName.toLowerCase().includes(search));
  }

}