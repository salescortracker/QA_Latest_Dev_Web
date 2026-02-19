import { Component } from '@angular/core';

@Component({
  selector: 'app-controlpanel-users',
  standalone: false,
  templateUrl: './controlpanel-users.component.html',
  styleUrl: './controlpanel-users.component.css'
})
export class ControlpanelUsersComponent {

  showAddForm = false;

newUser: any = {
  UserID: 0,
  CompanyID: '',
  RegionID: '',
  EmployeeCode: '',
  FullName: '',
  Email: '',
  PasswordHash: '',
  RoleId: '',
  Status: 'Active',
  CreatedBy: '',
  CreatedDate: '',
  ModifiedBy: '',
  ModifiedAt: '',
  LastLogin: '',
  RefreshToken: '',
  RefreshTokenExpiry: '',
  reportingTo: '',
  departmentId: '',
  company_name: '',
  type: '',
  phone_number: '',
  module: '',
  userloginstatus: '',
  passwordchanged: false,
  userCompanyId: '',
  Designation: ''
};

  openAddUser() {
  this.showAddForm = true;
}

saveUser() {
  this.newUser.UserID = this.users.length + 1;

  this.users.push({
    name: this.newUser.FullName,
    email: this.newUser.Email,
    company: this.newUser.company_name,
    status: this.newUser.Status,
    ...this.newUser
  });

  this.showAddForm = false;
  this.resetForm();
}

resetForm() {
  this.newUser = {
    UserID: 0,
    CompanyID: '',
    RegionID: '',
    EmployeeCode: '',
    FullName: '',
    Email: '',
    PasswordHash: '',
    RoleId: '',
    Status: 'Active',
    CreatedBy: '',
    CreatedDate: '',
    ModifiedBy: '',
    ModifiedAt: '',
    LastLogin: '',
    RefreshToken: '',
    RefreshTokenExpiry: '',
    reportingTo: '',
    departmentId: '',
    company_name: '',
    type: '',
    phone_number: '',
    module: '',
    userloginstatus: '',
    passwordchanged: false,
    userCompanyId: '',
    Designation: ''
  };
}

users = [
    {
      name: 'Arun Kumar',
      email: 'arun@company.com',
      company: 'Infosys',
      status: 'Active'
    },
    {
      name: 'Priya Sharma',
      email: 'priya@company.com',
      company: 'TCS',
      status: 'Active'
    },
    {
      name: 'Rahul Verma',
      email: 'rahul@company.com',
      company: 'Wipro',
      status: 'Inactive'
    },
    {
      name: 'Sneha Iyer',
      email: 'sneha@company.com',
      company: 'HCL Technologies',
      status: 'Active'
    }
  ];


closeForm() {
  this.showAddForm = false;
  this.resetForm();
}
currentPage = 1;
pageSize = 10;

get totalPages(): number {
  return Math.ceil(this.users.length / this.pageSize);
}

get paginatedUsers() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.users.slice(start, start + this.pageSize);
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

}
