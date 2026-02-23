import { Component, OnInit } from '@angular/core';
import { AdminService, CompanyPolicy, PolicyCategory } from '../../servies/admin.service';

@Component({
  selector: 'app-company-policies',
  standalone: false,
  templateUrl: './company-policies.component.html',
  styleUrls: ['./company-policies.component.css']
})
export class CompanyPoliciesComponent implements OnInit {

  policies: CompanyPolicy[] = [];
  filteredPolicies: CompanyPolicy[] = [];
  categories: PolicyCategory[] = [];
  policy: CompanyPolicy;
  isEditMode = false;
  showStatus: 'published' | 'archived' = 'published';

  userId!: number;
  companyId!: number;
  regionId!: number;

  constructor(private adminService: AdminService) {
    this.policy = this.newPolicy();
  }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("UserId"));
    this.companyId = Number(sessionStorage.getItem("CompanyId"));
    this.regionId = Number(sessionStorage.getItem("RegionId"));

    this.loadCategories();
    this.loadPolicies();
  }

  // New empty policy
  newPolicy(): CompanyPolicy {
    return {
      policyId: 0,
      companyId: this.companyId,
      regionId: this.regionId,
      title: '',
      categoryId: null,
      effectiveDate: new Date(),
      description: '',
      file: null,
      status: 'published',
      version: 1
    };
  }

  // Load categories for dropdown
  loadCategories() {
    this.adminService.getAttendancePolicyCategories(this.companyId, this.regionId)
      .subscribe({
        next: res => this.categories = res || [],
        error: err => console.error("Category Load Error:", err)
      });
  }

  // Load all policies
  loadPolicies() {
    this.adminService.getPolicies(this.companyId, this.regionId)
      .subscribe({
        next: res => {
          // map categoryName properly for table display
          this.policies = (res || []).map(p => ({
            ...p,
            categoryName: this.categories.find(c => c.PolicyCategoryID === p.categoryId)?.PolicyCategoryName,
            status: 'published',
            version: 1
          }));
          this.applyFilter();
        },
        error: err => console.error("Policy Load Error:", err)
      });
  }

  // Filter by status
  toggleView(status: 'published' | 'archived') {
    this.showStatus = status;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredPolicies = this.policies.filter(p => p.status === this.showStatus);
  }

  // Submit (Create / Update)
  onSubmit() {
    if (!this.policy.categoryId) { alert('Please select a category'); return; }

    const effectiveDate = typeof this.policy.effectiveDate === 'string'
      ? new Date(this.policy.effectiveDate)
      : this.policy.effectiveDate;

    const fd = new FormData();
    fd.append("PolicyId", String(this.policy.policyId || 0));
    fd.append("CompanyId", String(this.companyId));
    fd.append("RegionId", String(this.regionId));
    fd.append("Title", this.policy.title);
    fd.append("CategoryId", String(this.policy.categoryId));
    fd.append("EffectiveDate", effectiveDate.toISOString());
    fd.append("Description", this.policy.description || "");
    if (this.policy.file) fd.append("File", this.policy.file);

    if (this.isEditMode) {
      this.adminService.updatePolicy(fd, this.companyId, this.regionId).subscribe({
        next: () => { this.loadPolicies(); this.resetForm(); },
        error: err => alert("Update failed: " + err.message)
      });
    } else {
      this.adminService.createPolicy(fd, this.companyId, this.regionId).subscribe({
        next: () => { this.loadPolicies(); this.resetForm(); },
        error: err => alert("Create failed: " + err.message)
      });
    }
  }

  // Edit
  editPolicy(p: CompanyPolicy) {
    this.isEditMode = true;
    this.policy = { ...p, file: null };
  }

  // Delete
  deletePolicy(id?: number) {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this policy?")) return;

    this.adminService.deletePolicy(id, this.companyId, this.regionId).subscribe({
      next: () => this.loadPolicies(),
      error: err => alert("Delete failed: " + err.message)
    });
  }

  // File change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.policy.file = file;
      this.policy.fileName = file.name;
    }
  }

  // Reset form
  resetForm() {
    this.policy = this.newPolicy();
    this.isEditMode = false;
  }
}