import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin/servies/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  users = [
    { role: 'HR', username: 'hr_user', password: 'Hr@123', route: '/dashboard' },
    { role: 'Manager', username: 'manager_user', password: 'Mg@123', route: '/dashboard' },
    { role: 'Admin', username: 'admin_user', password: 'Admin@123', route: '/admin/dashboard' },
    { role: 'SuperAdmin', username: 'superadmin_user', password: 'Superadmin@123', route: '/dashboard' },
    { role: 'Finance', username: 'finance_user', password: 'Fn@123', route: '/dashboard' },
    { role: 'Employee', username: 'emp_user', password: 'emp@123', route: '/dashboard' }
  ];

  constructor(private router: Router, private loginService: AdminService) { }

  // login() {
  //   const user = this.users.find(u => u.username === this.username && u.password === this.password);
  //   if (user) {
  //     sessionStorage.setItem("CompanyId","1"); // Set a default CompanyId
  //     sessionStorage.setItem("regionId","1"); // Set a default regionId
  //     localStorage.setItem('currentUser', JSON.stringify(user)); // store user info
  //     this.router.navigate([user.route]);
  //   } else {
  //     this.errorMessage = 'Invalid username or password';
  //   }
  // }
login() {
  // debugger;
  this.errorMessage = '';

  if (!this.username || !this.password) {
    this.errorMessage = 'Please enter username and password';
    return;
  }

  this.loading = true;

  this.loginService.login(this.username, this.password).subscribe({
    next: (response) => {
      this.loading = false;

      if (response && response.message && response.user) {

        const user = response.user;

        // ✅ Store IDs
        sessionStorage.setItem('CompanyId', user.companyId?.toString() ?? '');
        sessionStorage.setItem('RegionId', user.regionId?.toString() ?? '');
        sessionStorage.setItem('roleId', user.roleId?.toString() ?? '');
        sessionStorage.setItem('UserId', user.userId?.toString() ?? '');
        sessionStorage.setItem('DepartmentId', user.departmentId?.toString() ?? '');
        sessionStorage.setItem('ReportingManagerId', user.reportingTo?.toString() ?? '');

        // ✅ Store Basic Info
        sessionStorage.setItem('Name', user.fullName ?? '');
        sessionStorage.setItem('EmployeeCode', user.employeeCode ?? '');
        sessionStorage.setItem('Email', user.personalEmail ?? '');
        sessionStorage.setItem('roleName', user.roleName ?? '');
        sessionStorage.setItem('RegionName', user.regionName ?? '');
        sessionStorage.setItem('CompanyName', user.companyName ?? '');
        sessionStorage.setItem('DepartmentProject', user.departmentProject ?? '');
        sessionStorage.setItem('paswordChanged', user.paswordChanged ?? '');

        // ✅ Store STRING VALUES (FROM JOIN QUERY)
        sessionStorage.setItem('DepartmentName', user.departmentName ?? '');
        sessionStorage.setItem('ReportingManagerName', user.reportingManagerName ?? '');
        sessionStorage.setItem('Designation', user.designation ?? '');

        // Optional: store full user object
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        console.log("FULL LOGIN RESPONSE:", response);
        console.log("USER OBJECT:", user);
        console.log("Designation from API:", user.designation);

        Swal.fire('Login Successful', response.message, 'success');

        // 🔐 Force password change if needed
        if (!user.paswordChanged) {
          Swal.fire(
            'Change Password',
            'You must change your password before proceeding.',
            'info'
          );
          this.router.navigate(['/change-password'], {
            queryParams: { userId: user.userId }
          });
          return;
        }

        // ✅ Navigate by role
        const route =
          user.roleName === 'Admin'
            ? '/admin/dashboard'
            : '/dashboard';

        this.router.navigate([route]);

      } else {
        this.errorMessage = 'Invalid username or password';
      }
    },
    error: (error) => {
      this.loading = false;
      console.error('Login failed:', error);
      this.errorMessage = 'Server error. Please try again.';
    }
  });
}

}
