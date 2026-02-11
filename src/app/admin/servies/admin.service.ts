import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse  } from '@angular/common/http';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EmployeeDocument } from '../layout/models/employee-document.model';
import { EmployeeForm } from '../layout/models/employee-forms.model';
import { EmployeeLetter } from '../layout/models/employee-letter.model';
// ------------ Model Interfaces ----------------
//---------------------------------BANK DETAILS-----------------------------------------//
export interface BankDetails {
  bankDetailsId: number;
  employeeId: number;
  regionId?: number;
  userId?: number;
  companyId?: number;
  bankName: string;
  branchName: string;
  accountHolderName: string;
  accountNumber: string;
  accountTypeId: number;
  ifsccode?: string;
  micrcode?: string;
  upiid?: string;
}
 // ------------------------------DD LIST-----------------------------------//
 export interface EmployeeDdlist {
 ddlistId: number;
  ddnumber: string;
  dddate: string;
  bankName: string;
  branchName: string;
  amount: number;
  payeeName: string;
  ddcopyFilePath?: string;
  companyId: number;
  regionId: number;
  employeeId: number;
}


//---------------------------------W4 (usa)------------------------------//

export interface W4Details {
  w4Id: number;
  employeeId: number;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  filingStatus: string;
  multipleJobsOrSpouse?: boolean;
  totalDependents?: number;
  dependentAmounts?: number;
  otherIncome?: number;
  deductions?: number;
  extraWithholding?: number;
  employeeSignature: string;
  formDate: string; // DateOnly -> string
  regionId?: number;
  userId?: number;
  companyId?: number;
}


export interface EmployeeJobHistoryDto {
  id: number;
  employer: string;
  jobTitle: string;
  fromDate: string;
  toDate: string;
  lastCTC: number;
  website: string;
  employeeCode: string;
  reasonForLeaving: string;
  uploadDocumentPath?: string;
  companyId: number;
  regionId: number;
  userId: number;
  createdBy: number;
  createdAt: string;
  modifiedBy?: number;
  modifiedAt?: string;
}

export interface EmployeeEducationDto {
  educationId: number;
  userId: number;
  companyId: number;
  regionId: number;
  modeOfStudyId: number;
  qualification: string;
  specialization: string;
  institution: string;
  board: string;
  startDate: string;
  endDate: string;
  result: string;
  certificateFilePath?: string;
}
export interface EmployeeCertificationDto {
  certificationId: number;
  companyId: number;
  regionId: number;
  userId: number;

  certificationName: string;
  certificationTypeId: number;
  // optional friendly name (we'll populate it client-side)
  certificationTypeName?: string;

  description?: string;
  documentPath?: string;
  documentFile?: File | null;

  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number | null;
  modifiedDate?: string | null;
}
export interface EmployeeImmigration {
  regionId: number;
  companyId: number;
  immigrationId?: number;

  employeeId: string;
  userId: number;

  fullName: string;
  dateOfBirth: string;
  nationality: string;

  passportNumber: string;
  passportExpiryDate: string;

  visaTypeId: number;
  visaTypeName?: string;

  statusId: number;
  statusName?: string;

  visaNumber: string;
  visaIssueDate: string;
  visaExpiryDate: string;
  visaIssuingCountry: string;

  employerName: string;
  employerAddress: string;
  employerContact: string;
  contactPerson: string;

  remarks: string;

  passportCopyPath?: string;
  visaCopyPath?: string;
  otherDocumentsPath?: string;

  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
}


export interface Designation {
  designationID: number;
  companyId: number;
  regionId: number;
  designationName: string;
  description?: string;
  isActive: boolean;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  isDeleted?: boolean;
}

export interface AssetStatus {
  AssetStatusID: number;
  AssetStatusName: string;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;
}
export interface PolicyCategory {
  PolicyCategoryID?: number;
  CompanyID: number;
  RegionID: number;
  PolicyCategoryName: string;
  IsActive: boolean;
}
export interface AttachmentType {
  AttachmentTypeID?: number;
  AttachmentTypeName: string;
  IsActive: boolean;
  CompanyID: number;   // <-- add this
  RegionID: number;    // <-- add this
}
export interface ProjectStatus {
  ProjectStatusID: number;
  ProjectStatusName: string;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;
}
export interface AttendanceStatus {
  AttendanceStatusID: number;
  AttendanceStatusName: string;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;

  
}
export interface ExpenseCategory {
  ExpenseCategoryID: number;
  expenseCategoryName: string;
  isActive: boolean;
  CompanyID: number;
  RegionID: number;
  SortOrder: number;
  Description: string;
}
export interface LeaveStatus {
  LeaveStatusID: number;
  LeaveStatusName: string;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;
}
export interface ChangePasswordRequest {
  UserID: number;
  oldPassword: string;
  newPassword: string;
 
}
// export interface AssetStatus {
//   assetStatusId: number;
//   assetStatusName: string;
//   description: string;
//   isActive: boolean;
//   companyId: number;
//   regionId: number;
// }
export interface LeaveType {
  LeaveTypeId: number;
  LeaveTypeName: string;
  LeaveDays: number;
  IsActive: boolean;
   CompanyID: number;
  RegionID: number;
}
export interface ExpenseStatus {
  ExpenseStatusID: number;
  ExpenseStatusName: string;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;
}
export interface Company {
  companyId: number;
  companyName: string;
  companyCode?: string;
  industryType?: string;
  headquarters?: string;
  isActive: boolean;
  userId?: number;
  CreatedBy?: string;
  CreatedDate?: Date;
  ModifiedBy?: string;
  ModifiedAt?: Date;
}
export interface MenuRoleDto {
  menuRoleId: number;
  roleId: number;
  roleName: string;
  menuId: number;
  menuName: string;
  menuUrl: string;
  orderNo: number;
  icon: string;
  parentId?: number;
  canView?: boolean;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  isActive: boolean;
}
export interface HelpdeskCategory {
  HelpdeskCategoryID: number;
  CategoryName: string;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;
}
export interface KpiCategory {
  KpiCategoryID?: number;
  KpiCategoryName: string;
  IsActive: boolean;
  CompanyID?: number;
  RegionID?: number;
}

export interface Relationship {
  RelationshipID: number;
  relationshipName: string;
  companyId:number;
  regionId:number;
  userId:number;
  companyName:string;
  regionName:string;
  isActive: boolean;
}
export interface MenuItem {
  label: string;           // <-- what UI expects
  link?: string;
  icon?: string;
  orderNo?: number;
  children?: MenuItem[];
}
export interface CertificationType {
  CertificationTypeID: number;
  CertificationTypeName: string;
  IsActive: boolean;
}
export interface BloodGroup {
  bloodGroupID: number;
  bloodGroupName: string;
  isActive: boolean;
}
export interface Gender {
  genderID: number;
  genderName: string;
  isActive: boolean;
  companyId: number;
  regionId: number; 
   // ✅ add these
  companyName?: string;
  regionName?: string;
  userId?: number;
}

export interface Region {
  regionID: number;
  companyID: number;
  regionName: string;
  country: string;
  isActive: boolean;
  userId?: number;
}
export interface LeaveType {
  leaveTypeID: number;
  leaveTypeName: string;
  leaveDays: number;
  IsActive: boolean;
  CompanyID: number;
  RegionID: number;
  companyName?: string;
  regionName?: string;
}
export interface User {
  userId?: number;
  companyId: number;
  regionId: number;
  employeeCode: string;
  fullName: string;
  email: string;
  roleId: number;
  departmentId:number;
  reportingTo:number;
  password?: string;
  status: string;
  userCompanyId?: number; // ✅ added for tracking which company the user belongs to
}

export interface MenuMaster {
  menuID: number;
  menuName: string;
  parentMenuID?: number|null;
  url?: string;
  icon?: string;
  orderNo?: number;
  isActive: boolean | number;
  CreatedBy?: string;
  CreatedDate?: Date;
  ModifiedBy?: string;
  ModifiedAt?: Date;
}

export interface RoleMaster {
  roleId?: number| undefined;
  roleName: string;
  roleDescription?: string;
  isActive: boolean;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
}
export interface Department {
  departmentID: number;
  companyID: number;
  regionID: number;
  departmentName: string;
  description?: string;
  isActive: boolean;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  isDeleted?: boolean;
}
export interface UserReadDto {
    userID: number;
  employeeCode: string;
  fullName: string;
  email: string;
  status: string;
  companyID: number;
  regionID: number;
}

export interface ShiftMasterDto {
  shiftID: number;
  shiftName: string;
  shiftStartTime?: string; // e.g. "09:00:00" or ISO time string
  shiftEndTime?: string;
  graceTime?: number;
  isActive?: boolean;
  companyID?: number;
  regionID?: number;
}

export interface ShiftAllocationDto {
  shiftAllocationId?: number;
  userID: number;
  employeeCode: string;
  fullName: string;
  companyID?: number;
  regionID?: number;
  shiftID: number;
  shiftName?: string;
  startDate: string; // "yyyy-MM-dd" - keep ISO for binding
  endDate?: string | null;
  isActive: boolean;
  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number;
  modifiedDate?: string;
}
 // ------------------ Employee Master Interface ------------------ //
  export interface EmployeeMaster {
    employeeMasterId: number;
    fullName: string;
    role?: string | null;
      roleId?: number;   // For backend
    department?: string | null;
    managerId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;  // ✅ needed for edit

  } 
  //------------------- Manager Dropdown Interface ------------------ //
  export interface ManagerDropdown {
    userId: number;
    fullName: string;
  }
  //---------------------------------My Team Hierarchy Interface---------------------//
export interface TeamHierarchyDto {
  employeeMasterId: number;
  fullName: string;
  role?: string | null;
  managerId?: number | null;
  subordinates: TeamHierarchyDto[];
  expanded?: boolean; // optional for UI toggle
}

export interface CertificationType {
  CertificationTypeID: number;
  CertificationTypeName: string;
  IsActive: boolean;
  Description?: string | null; // optional
  CompanyID?: number;           // optional
  RegionID?: number;            // optional
}
export interface ClockInOutDto {
  attendanceId?: number;   // optional for new records
  employeeCode: string;
  employeeName?: string;   // optional, can be filled from backend
  department?: string;     // optional
  clockType: 'Clock In' | 'Clock Out';
  time: string;            // HH:mm format
  createdBy?: number;      // user ID
}

// ------------------ Employee Master Interface ------------------ //
  export interface EmployeeMaster {
    employeeMasterId: number;
    fullName: string;
    role?: string | null;
      roleId?: number;   // For backend
    department?: string | null;
    managerId?: number | null;
    createdBy?: number | null;
    updatedBy?: number | null;  // ✅ needed for edit

  } 
  //------------------- Manager Dropdown Interface ------------------ //
  export interface ManagerDropdown {
    userId: number;
    fullName: string;
  }

//---------------------------------My Team Hierarchy Interface---------------------//
export interface TeamHierarchyDto {
  employeeMasterId: number;
  fullName: string;
  role?: string | null;
  managerId?: number | null;
  subordinates: TeamHierarchyDto[];
  expanded?: boolean; // optional for UI toggle
}
export interface MaritalStatus {
  maritalStatusID: number;
  companyID: number;
  regionID: number;
  statusName: string;
  description?: string;
  isActive: boolean;
    companyName?: string;
  regionName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.apiUrl; // 🔹 Change this to your actual API URL

  constructor(private http: HttpClient) {}
  // -------------------------------------------------------------
  // 🔹 GENERIC HELPERS
  // -------------------------------------------------------------

  private buildParams(params?: Record<string, any>): HttpParams {
    
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value);
        }
      });
    }
    return httpParams;
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  // Generic reusable CRUD
  private getAll<T>(endpoint: string, params?: Record<string, any>): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`, { params: this.buildParams(params) });
  }

  private getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  private create<T>(endpoint: string, model: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, model, this.getHeaders());
  }

  private update<T>(endpoint: string, id: number, model: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}/${id}`, model, this.getHeaders());
  }

  private delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  // -------------------------------------------------------------
  // 🔹 COMPANY OPERATIONS
  // -------------------------------------------------------------
  getCompanies(params?: any,userId?: number): Observable<Company[]> {
    return this.getAll<Company>('UserManagement/GetCompany?userId='+userId, params);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.getById<Company>('UserManagement/GetCompanyById', id);
  }

  createCompany(model: Company): Observable<Company> {
    return this.create<Company>('UserManagement/SaveCompany', model);
  }

  updateCompany(id: number, model: Company): Observable<Company> {
    return this.update<Company>('UserManagement/UpdateCompany', id, model);
  }

  deleteCompany(id: number): Observable<void> {
    return this.delete('UserManagement/DeleteCompany', id);
  }

  // -------------------------------------------------------------
  // 🔹 REGION OPERATIONS
  // -------------------------------------------------------------
  getRegions(params?: any,userId?: number): Observable<Region[]> {
    return this.getAll<Region>('UserManagement/GetRegion?userId='+userId, params);
  }

  getRegionById(id: number): Observable<Region> {
    return this.getById<Region>('UserManagement/GetRegionById', id);
  }

  createRegion(model: Region): Observable<Region> {
    return this.create<Region>('UserManagement/SaveRegion', model);
  }

  updateRegion(id: number, model: Region): Observable<Region> {
    return this.update<Region>('UserManagement/UpdateRegion', id, model);
  }

  deleteRegion(id: number): Observable<void> {
    return this.delete('UserManagement/DeleteRegion', id);
  }

  // -------------------------------------------------------------
  // 🔹 USER OPERATIONS
  // -------------------------------------------------------------
  // getUsers(params?: any): Observable<User[]> {
  //   return this.getAll<User>('UserManagement/getUsers', params);
  // }

  // getUserById(id: number): Observable<User> {
  //   return this.getById<User>('UserManagement/getUserById', id);
  // }

  // createUser(model: User): Observable<User> {
  //   return this.create<User>('UserManagement/createUser', model);
  // }

  // updateUser(id: number, model: User): Observable<User> {
  //   return this.update<User>('UserManagement/updateUser', id, model);
  // }

  // deleteUser(id: number): Observable<void> {
  //   return this.delete('UserManagement/deleteUser', id);
  // }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/UserManagement/GetAllUsers?userCompanyId=`+ (sessionStorage.getItem('UserId') ? Number(sessionStorage.getItem('UserId')) : 0));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/UserManagement/GetUserById/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/UserManagement/CreateUser`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/UserManagement/UpdateUser/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/UserManagement/DeleteUser/${id}`);
  }
  login(username: string, password: string): Observable<any> {
    const model = {email: username,password: password };
    return this.http.post<any>(`${this.baseUrl}/UserManagement/Login`, model).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login API error:', error);
    return throwError(() => new Error('Unable to process login. Please try again later.'));
  }

  sendWelcomeEmail(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/UserManagement/SendEmail`, user);
  }

  // -------------------------------------------------------------
  // 🔹 MENU MASTER OPERATIONS
  // -------------------------------------------------------------
  getMenus(params?: any): Observable<MenuMaster[]> {
    return this.getAll<MenuMaster>('UserManagement/GetAllMenus', params);
  }

  getMenuById(id: number): Observable<MenuMaster> {
    return this.getById<MenuMaster>('UserManagement/GetMenuById', id);
  }

  createMenu(model: MenuMaster): Observable<MenuMaster> {
    return this.create<MenuMaster>('UserManagement/CreateMenu', model);
  }

  updateMenu(id: number, model: MenuMaster): Observable<MenuMaster> {
    return this.update<MenuMaster>('UserManagement/UpdateMenu', id, model);
  }

  deleteMenu(id: number): Observable<void> {
    return this.delete('UserManagement/DeleteMenu', id);
  }

  // -------------------------------------------------------------
  // 🔹 Role MASTER OPERATIONS
  // -------------------------------------------------------------
  getroles(params?: any): Observable<RoleMaster[]> {
    return this.getAll<RoleMaster>('UserManagement/GetAllRoles', params);
  }

  getrolesById(id: number): Observable<RoleMaster> {
    return this.getById<RoleMaster>('UserManagement/GetRoleById', id);
  }

  createRoles(model: RoleMaster): Observable<RoleMaster> {
    return this.create<RoleMaster>('UserManagement/CreateRole', model);
  }

  updateRoles(id: number, model: RoleMaster): Observable<RoleMaster> {
    return this.update<RoleMaster>('UserManagement/UpdateRole', id, model);
  }

  deleteRoles(id: number): Observable<void> {
    return this.delete('UserManagement/DeleteRole', id);
  }



  // ✅ Role Permission APIs
  getPermissionsByRole(roleId: number|undefined): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/UserManagement/get-permissions/${roleId}`);
  }

  assignPermissions(roleId: number, permissions: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/UserManagement/assign-permissions/${roleId}`, permissions);
  }

  // ✅ Combined loader: Menus + Role Permissions merged
  getMenusWithPermissions(roleId: number|undefined): Observable<any[]> {
    return forkJoin({
      menus: this.getMenus(),
      permissions: this.getPermissionsByRole(roleId)
    }).pipe(
      map(({ menus, permissions }) => this.mergePermissions(menus, permissions))
    );
  }
  getMenusByRoleId(roleId: number): Observable<MenuRoleDto[]> {
    return this.http
      .get<MenuRoleDto[]>(`${this.baseUrl}/UserManagement/GetAllMenusByRoleId/${roleId}`)
      .pipe(catchError(this.handleError));
  }

  

  private mergePermissions(menus: MenuMaster[], permissions: any[]): any[] {
  // Function recursively maps permissions to each menu item
  const mapPermissions = (menuList: MenuMaster[]): any[] => {
    return menuList.map((menu): any => {
      const perm = permissions.find(p => p.menuId === menu.menuID);

      const mappedMenu: any = {
        ...menu,
        expanded: false,
        selected: perm ? perm.isActive : false,
        permissions: {
          view: perm ? perm.canView : false,
          add: perm ? perm.canAdd : false,
          edit: perm ? perm.canEdit : false,
          delete: perm ? perm.canDelete : false,
          approve: perm ? perm.canApprove : false
        },
        children: [] as any[]
      };

      // Recursively process children
      const childMenus = menus.filter(m => m.parentMenuID === menu.menuID);
      if (childMenus.length > 0) {
        mappedMenu.children = mapPermissions(childMenus);
      }

      return mappedMenu;
    });
  };

  // Start with root-level menus
  const rootMenus = menus.filter(m => !m.parentMenuID);
  return mapPermissions(rootMenus);
}
bulkInsertData(entityName: string, data: any[]): Observable<any> {
  const payload = {
    entityName,
    data
  };
  return this.http.post(`${this.baseUrl}/UserManagement/BulkInsert`, payload);
}
// -------------------------------------------------------------
// 🔹 DEPARTMENT OPERATIONS
// -------------------------------------------------------------
getDepartments(): Observable<Department[]> {
  return this.getAll<Department>(`MasterData/GetDepartments`);
}

getDepartmentById(id: number): Observable<Department> {
  return this.getById<Department>(`MasterData/GetDepartmentById`, id);
}

createDepartment(model: Department): Observable<any> {
  return this.create<Department>(`MasterData/CreateDepartment`, model);
}

updateDepartment(id: number, model: Department): Observable<any> {
  return this.update<Department>(`MasterData/updateDepartment`, id, model);
}

deleteDepartment(id: number): Observable<any> {
  return this.http.post(`/MasterData/DeleteDepartment/${id}`, {}); // soft delete
}

getDesignations(): Observable<Designation[]> {
  return this.getAll<Designation>(`MasterData/GetDesignations`);
}

getDesignationById(id: number): Observable<Designation> {
  return this.getById<Designation>(`MasterData/GetDesignationById`, id);
}

createDesignation(model: Designation): Observable<any> {
  return this.create<Designation>(`MasterData/CreateDesignation`, model);
}

updateDesignation(id: number, model: Designation): Observable<any> {
  return this.update<Designation>(`MasterData/UpdateDesignation`, id, model);
}

deleteDesignation(id: number): Observable<any> {
  // Using POST for soft delete pattern as per your Department delete
  return this.http.post(`${this.baseUrl}/MasterData/DeleteDesignation/${id}`,{} );
}

getGenders(companyId: number, regionId: number,userId: number) {
  return this.http.get<any>(
    `${this.baseUrl}/MasterData/GetGenderAll`,
    {
      params: {
        companyId: companyId,
        regionId: regionId,
        userId: userId
      }
    }
  );
}

createGender(gender: Gender) {
  return this.http.post(`${this.baseUrl}/MasterData/CreateGender`, gender);
}

updateGender(gender: Gender) {
  return this.http.post(`${this.baseUrl}/MasterData/UpdateGender`, gender);
}

deleteGender(id: number) {
  return this.http.post(`${this.baseUrl}/MasterData/DeleteGender?id=${id}`, {});
}
// Example endpoints
getBloodGroups() {
  return this.http.get(`${this.baseUrl}/bloodgroups`);
}

createBloodGroup(data: any) {
  return this.http.post(`${this.baseUrl}/bloodgroups`, data);
}

updateBloodGroup(id: number, data: any) {
  return this.http.put(`${this.baseUrl}/bloodgroups/${id}`, data);
}

deleteBloodGroup(id: number) {
  return this.http.delete(`${this.baseUrl}/bloodgroups/${id}`);
}
//martital status CRUD operations

   // ----------------- Marital Status -----------------
  getMaritalStatuses(): Observable<MaritalStatus[]> {
    // Must POST {} because backend uses [HttpPost("getall")]
    return this.http.post<MaritalStatus[]>(`${this.baseUrl}/UserManagement/getall`, {});
  }

  createMaritalStatus(data: MaritalStatus): Observable<any> {
    const fd = new FormData();
    fd.append('companyId', data.companyID.toString());
    fd.append('regionId', data.regionID.toString());
    fd.append('maritalStatusName', data.statusName);
    fd.append('description', data.description ?? '');
    fd.append('isActive', data.isActive.toString());
    return this.http.post(`${this.baseUrl}/UserManagement/create`, fd);
  }

  updateMaritalStatus(data: MaritalStatus): Observable<any> {
    const fd = new FormData();
    fd.append('id', data.maritalStatusID.toString());
    fd.append('companyId', data.companyID.toString());
    fd.append('regionId', data.regionID.toString());
    fd.append('maritalStatusName', data.statusName);
    fd.append('description', data.description ?? '');
    fd.append('isActive', data.isActive.toString());
    return this.http.post(`${this.baseUrl}/UserManagement/update`, fd);
  }

  deleteMaritalStatus(id: number): Observable<any> {
    const fd = new FormData();
    fd.append('id', id.toString());
    return this.http.post(`${this.baseUrl}/UserManagement/delete`, fd);
  }
// ---------------- RELATIONSHIP MASTER ---------------- //

getRelationships(userId: number, companyId: number, regionId: number) {
  return this.http.get<any>(`${this.baseUrl}/UserManagement/GetAllRelationShip`,{
      params: {
        userId: userId,
        companyId: companyId,
        regionId: regionId
      }})
}

createRelationship(data: any) {
  return this.http.post<any>(`${this.baseUrl}/UserManagement/AddRelationship`, data);
}

updateRelationship(data: any) {
  return this.http.post<any>(`${this.baseUrl}/UpdateRelationship`, data);
}

deleteRelationship(id: number) {
  return this.http.post<any>(`${this.baseUrl}/UserManagement/DeleteRelationship?id=${id}`, {});
}
 
  // Policy Category

createPolicyCategory(policy: PolicyCategory) {
  return this.http.post(`${this.baseUrl}/PolicyCategory`, policy);
}

updatePolicyCategory(id: number, policy: PolicyCategory) {
  return this.http.put(`${this.baseUrl}/PolicyCategory/${id}`, policy);
}

deletePolicyCategory(id: number) {
  return this.http.delete(`${this.baseUrl}/PolicyCategory/${id}`);
}

// Get policy categories by company and region
  getPolicyCategories(companyID: number, regionID: number): Observable<PolicyCategory[]> {
    let params = new HttpParams()
      .set('CompanyID', companyID.toString())
      .set('RegionID', regionID.toString());

    return this.http.get<PolicyCategory[]>(`${this.baseUrl}/PolicyCategory`, { params });
  }
  
getAttachmentTypes(companyId: number, regionId: number) {
  return this.http.get<any>(`${this.baseUrl}/AttachmentType/Get?companyId=${companyId}&regionId=${regionId}`);
}

createAttachmentType(data: AttachmentType) {
  return this.http.post<any>(`${this.baseUrl}/AttachmentType/Create`, data);
}

updateAttachmentType(data: AttachmentType) {
  return this.http.put<any>(`${this.baseUrl}/AttachmentType/Update`, data);
}

deleteAttachmentType(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/AttachmentType/Delete/${id}`);
}
// GET all project statuses
  getProjectStatuses(companyId: number, regionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/project-status?companyId=${companyId}&regionId=${regionId}`);
  }

  // CREATE
  createProjectStatus(status: ProjectStatus): Observable<any> {
    return this.http.post(`${this.baseUrl}/project-status`, status);
  }

  // UPDATE
  updateProjectStatus(status: ProjectStatus): Observable<any> {
    return this.http.put(`${this.baseUrl}/project-status/${status.ProjectStatusID}`, status);
  }

  // DELETE
  deleteProjectStatus(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/project-status/${id}`);
  }

  // GET all asset statuses
  getAssetStatuses(companyId: number, regionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/asset-status?companyId=${companyId}&regionId=${regionId}`);
  }

  // CREATE
  createAssetStatus(status: AssetStatus): Observable<any> {
    return this.http.post(`${this.baseUrl}/asset-status`, status);
  }

  // UPDATE
  updateAssetStatus(status: AssetStatus): Observable<any> {
    return this.http.put(`${this.baseUrl}/asset-status/${status.AssetStatusID}`, status);
  }

  // DELETE
  deleteAssetStatus(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/asset-status/${id}`);
  }

  // GET all helpdesk categories
  getHelpdeskCategories(companyId: number, regionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/helpdesk-category?companyId=${companyId}&regionId=${regionId}`);
  }

  // CREATE
  createHelpdeskCategory(category: HelpdeskCategory): Observable<any> {
    return this.http.post(`${this.baseUrl}/helpdesk-category`, category);
  }

  // UPDATE
  updateHelpdeskCategory(category: HelpdeskCategory): Observable<any> {
    return this.http.put(`${this.baseUrl}/helpdesk-category/${category.HelpdeskCategoryID}`, category);
  }

  // DELETE
  deleteHelpdeskCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/helpdesk-category/${id}`);
  }
 getAttendanceStatus(companyId: number, regionId: number) {
  return this.http.get<any>(`${this.baseUrl}/AttendanceStatus/GetAll?companyId=${companyId}&regionId=${regionId}`);
}

createAttendanceStatus(model: AttendanceStatus) {
  return this.http.post(`${this.baseUrl}/AttendanceStatus/Create`, model);
}

updateAttendanceStatus(model: AttendanceStatus) {
  return this.http.put(`${this.baseUrl}/AttendanceStatus/Update`, model);
}

deleteAttendanceStatus(id: number) {
  return this.http.delete(`${this.baseUrl}/AttendanceStatus/Delete?id=${id}`);
}
// ================= LEAVE STATUS ===================

// Get All
getLeaveStatus(companyId: number, regionId: number) {
  return this.http.get<any>(
    `${this.baseUrl}/LeaveStatus/GetLeaveStatus?CompanyID=${companyId}&RegionID=${regionId}`
  );
}

// Create
createLeaveStatus(data: LeaveStatus) {
  return this.http.post<any>(`${this.baseUrl}/LeaveStatus/CreateLeaveStatus`, data);
}

// Update
updateLeaveStatus(data: LeaveStatus) {
  return this.http.put<any>(`${this.baseUrl}/LeaveStatus/UpdateLeaveStatus`, data);
}

// Delete
deleteLeaveStatus(id: number) {
  return this.http.delete<any>(
    `${this.baseUrl}/LeaveStatus/DeleteLeaveStatus?LeaveStatusID=${id}`
  );
}

 getLeaveType(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(`${this.baseUrl}/MasterData/GetLeaveType`);
  }
  createLeaveType(model: LeaveType): Observable<any> {
    return this.http.post(`${this.baseUrl}/MasterData/CreateLeaveType`, model);
  }

  updateLeaveType(model: LeaveType): Observable<any> {
    return this.http.post(`${this.baseUrl}/MasterData/UpdateLeaveType`, model);
  }
deleteLeaveType(id: number) {
  
  return this.http.post(
    `${this.baseUrl}/MasterData/DeleteLeaveType?id=${id}`,{}
  );
}
// EXPENSE STATUS CRUD

getExpenseStatus(companyId: number, regionId: number) {
  return this.http.get<any>(`${this.baseUrl}/GetExpenseStatus?companyId=${companyId}&regionId=${regionId}`);
}

createExpenseStatus(data: ExpenseStatus) {
  return this.http.post<any>(`${this.baseUrl}/CreateExpenseStatus`, data);
}

updateExpenseStatus(data: ExpenseStatus) {
  return this.http.put<any>(`${this.baseUrl}/UpdateExpenseStatus`, data);
}

deleteExpenseStatus(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/DeleteExpenseStatus/${id}`);
}
 // ------------------ EXPENSE CATEGORY TYPE ------------------

createExpenseCategoryType(model: ExpenseCategory) {
  return this.http.post(`${this.baseUrl}/ExpenseCategoryType/Create`, model);
}

updateExpenseCategoryType(model: ExpenseCategory) {
  return this.http.put(`${this.baseUrl}/ExpenseCategoryType/Update`, model);
}

deleteExpenseCategoryType(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/ExpenseCategoryType/Delete/${id}`);
}

getAllExpenseCategoryTypes(companyId: number, regionId: number) {
  return this.http.get<any>(
    `${this.baseUrl}/ExpenseCategoryType/GetAll/${companyId}/${regionId}`
  );
}

// Get All
    getAllEmployeeImmigrations(): Observable<EmployeeImmigration[]> {
      return this.http.get<EmployeeImmigration[]>(`${this.baseUrl}/Employee/GetImmigration`);
    }

  getEmployeeImmigrationById(id: number) : Observable <EmployeeImmigration> {
    return this.http.get<EmployeeImmigration>(`${this.baseUrl}/UserManagement/GetByIdImmigration/${id}`);
  }

CreateEmployeeImmigration(formData: FormData): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/Employee/CreateImmigration`,
    formData
  );
}
 UpdateEmployeeImmigration(id: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/Employee/UpdateImmigration/${id}`, formData, {
    responseType: 'text'  // Add this line
  });
}
  DeleteEmployeeImmigration(id: number, companyId: number, regionId: number): Observable <any> {
    return this.http.delete(`${this.baseUrl}/Employee/DeleteImmigration/${id}`)
  }
// Visa Types Dropdown
getVisaTypes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Employee/GetVisaTypes`);
}

// Status Dropdown
getStatuses(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/Employee/GetStatuses`);
}

DownloadImmigrationFile(id: number, fileType: string): Observable<Blob> {
  return this.http.get(
    `${this.baseUrl}/UserManagement/DownloadImmigrationFile/${id}/${fileType}`,
    { responseType: 'blob' }
  );
}
getFileBaseUrl(): string {
  return this.baseUrl + '/uploads/';
}

// -------------------------------------------------------------
// 🔹 EMPLOYEE JOB HISTORY OPERATIONS
// -------------------------------------------------------------


// Get ALL job history records
getAllJobHistory(params?: any): Observable<EmployeeJobHistoryDto[]> {
  return this.getAll<EmployeeJobHistoryDto>('UserManagement/GetAllJobHistory', params);
}


getJobHistoryByEmployeeId(employeeId: number): Observable<EmployeeJobHistoryDto[]> {
  return this.http.get<EmployeeJobHistoryDto[]>(
    `${this.baseUrl}/employee/user/${employeeId}/jobhistory`
  );
}


// Get a single job history by ID
getJobHistoryById(id: number): Observable<EmployeeJobHistoryDto> {
  return this.getById<EmployeeJobHistoryDto>('employee/GetJobHistoryById', id);
}



addJobHistory(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/Employee/AddJobHistory`, formData);
}



// Update job history (with file upload)
updateJobHistory(id: number, model: any): Observable<any> {
  const formData = new FormData();

  Object.keys(model).forEach(key => {
    if (key === 'uploadDocument' && model[key]) {
      formData.append('UploadDocument', model[key]);
    } else {
      formData.append(key, model[key]);
    }
  });

  return this.http.post(`${this.baseUrl}/employee/updatejobhistory/${id}`, formData);
}


// Delete job history
deleteJobHistory(id: number): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/employee/deletejobhistory?id=${id}`, {});
}

//-----------Education Details APIs -----------------//

  // Get education by userId
 getEducationByUserId(userId: number): Observable<EmployeeEducationDto[]> {
    return this.http.get<EmployeeEducationDto[]>(`${this.baseUrl}/Employee/user/${userId}/education`);
}
GetAllEducation(): Observable<EmployeeEducationDto[]> {
  return this.getAll<EmployeeEducationDto>('Employee/GetAllEducation');
}
  // Add new education
  addEducation(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Employee/AddEducation`, formData);
  }

  // Update education
  updateEducation(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Employee/UpdateEducation/${id}`, formData);
  }

deleteEducation(id: number): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/Employee/DeleteEducation?id=${id}`,
    {}
  );
}
  // Mode of Study
  getModeOfStudy(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employee/modeofstudy`);
  }
// ================= CERTIFICATION APIs =================



getCertificationsByUserId(userId: number): Observable<EmployeeCertificationDto[]> {
  return this.http.get<EmployeeCertificationDto[]>(
    `${this.baseUrl}/employee/user/${userId}/certifications`
  );
}

addCertification(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/Employee/AddCertification`, formData);
}

updateCertification(id: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/Employee/UpdateCertification/${id}`, formData);
}

deleteCertification(id: number): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/Employee/DeleteCertification?id=${id}`,
    { }
  );
}
 
// -------------------------------------------------------------
// 🔹 EMPLOYEE  Letters  OPERATIONS
// -------------------------------------------------------------
// ✅ Get Active Document Types for Dropdown
getActiveDocumentTypes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/employee/GetActiveDocumentTypes`);
}
getEmployeeLettersByEmployeeId(employeeId: number): Observable<EmployeeLetter[]> {
  return this.http.get<EmployeeLetter[]>(
    `${this.baseUrl}/employee/GetLettersByUser/${employeeId}`
  );
}
// POST - Add new employee letter
addEmployeeLetter(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/AddLetter`, formData);
}

// UPDATE letter (FIXED)
updateEmployeeLetter(id: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/UpdateLetter/${id}`, formData);
}

// DELETE letter (FIXED)
deleteEmployeeLetter(id: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/deleteletters?id=${id}`, {});
}

// -------------------------------------------------------------
// 🔹 EMPLOYEE  Forms  OPERATIONS
// -------------------------------------------------------------

getEmployeeFormsByEmployeeId(employeeId: number): Observable<EmployeeForm[]> {
  return this.http.get<EmployeeForm[]>(
    `${this.baseUrl}/employee/GetUserForms/${employeeId}`
  );
}
addEmployeeForms(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/AddForm`, formData);
}

// UPDATE letter (FIXED)
updateEmployeeForms(id: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/UpdateForm/${id}`, formData);
}

// DELETE letter (FIXED)
deleteEmployeeForms(id: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/DeleteForm?id=${id}`, {});
}
// -------------------------------------------------------------
// 🔹 EMPLOYEE  Document  OPERATIONS
// -------------------------------------------------------------
getEmployeeDocumentByEmployeeId(employeeId: number): Observable<EmployeeDocument[]> {
  return this.http.get<EmployeeDocument[]>(
    `${this.baseUrl}/employee/user/${employeeId}/documents`
  );
}
addEmployeeDocument(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/AddDocument`, formData);
}
updateEmployeeDocument(id: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/employee/UpdateDocument/${id}`, formData);
}

// DELETE letter (FIXED)
deleteEmployeeDocument(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/employee/DeleteDocument/${id}`);
}

//--------------------------------BANK - DETAILS-----------------------------------//
getBankDetails(): Observable<BankDetails[]> {
  return this.http.get<BankDetails[]>(`${this.baseUrl}/employee/GetAllBankDetails`);
}

getBankDetailById(id: number): Observable<BankDetails> {
  return this.http.get<BankDetails>(`${this.baseUrl}/employee/GetBankDetailsById/${id}`);
}

createBankDetail(bank: FormData | BankDetails): Observable<BankDetails> {
  return this.http.post<BankDetails>(`${this.baseUrl}/employee/CreateBankDetails`, bank);
}

updateBankDetail(bank: FormData | BankDetails): Observable<BankDetails> {
  return this.http.post<BankDetails>(`${this.baseUrl}/employee/UpdateBankDetails`, bank);
}

deleteBankDetail(id: number): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/employee/DeleteBankDetails?id=${id}`, {});
}

 
   
//------------------------------DD LIST -----------------------------------------//

getAllDdlist(): Observable<EmployeeDdlist[]> {
  return this.http.get<EmployeeDdlist[]>(`${this.baseUrl}/employee/GetAllDdlist`);
}

createDdlist(dd: EmployeeDdlist): Observable<EmployeeDdlist> {
  return this.http.post<EmployeeDdlist>(`${this.baseUrl}/employee/CreateDdlist`, dd);
}

updateDdlist(dd: EmployeeDdlist): Observable<EmployeeDdlist> {
  return this.http.post<EmployeeDdlist>(`${this.baseUrl}/employee/UpdateDdlist`, dd);
}

deleteDdlist(id: number): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/employee/DeleteDdlist?id=${id}`, {});
}

/// -------------------- DD COPY UPLOAD / DOWNLOAD --------------------

// Upload DD Copy
uploadDDCopy(formData: FormData): Observable<{ fileName: string }> {
  return this.http.post<{ fileName: string }>(
    `${this.baseUrl}/employee/UploadDDCopy`,
    formData
  );
}

// Download DD Copy (not mandatory for View button)
downloadDDCopy(fileName: string): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/employee/DownloadDDCopy/${fileName}`, { responseType: 'blob' });
}


  //-------------------------------------W4 usa ---------------------------------//

  getW4List(): Observable<W4Details[]> {
    return this.http.get<W4Details[]>(`${this.baseUrl}/employee/GetAllW4s`);
  }

  getW4ById(id: number): Observable<W4Details> {
    return this.http.get<W4Details>(`${this.baseUrl}/employee/GetW4ById/${id}`);
  }

  createW4(w4: W4Details): Observable<W4Details> {
    return this.http.post<W4Details>(`${this.baseUrl}/employee/CreateW4`, w4, this.getHeaders());
  }

  updateW4(w4: W4Details): Observable<W4Details> {
    return this.http.post<W4Details>(`${this.baseUrl}/employee/UpdateW4`, w4, this.getHeaders());
  }

  deleteW4(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/employee/DeleteW4?id=${id}`, {});
  }
  getexpensecategoryAll(companyId: number, regionId: number) {
    return this.http.get<any>(
      `${this.baseUrl}/MasterData/GetexpenseCategoryAll?companyId=${companyId}&regionId=${regionId}`
    );
  }

  addexpenseCategory(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/MasterData/AddexpenseCategory`, payload);
  }

  updateexpensecategory(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/MasterData/UpdateexpenseCategory`, payload);
  }

  deleteexpenseCategory(id: number) {
    return this.http.post<any>(`${this.baseUrl}/MasterData/DeleteexpenseCategory?id=${id}`, {});
  }


// -------------------------------
  // SHIFT MASTER
  // -------------------------------
  getAllShifts(): Observable<ShiftMasterDto[]> {
    return this.http.get<ShiftMasterDto[]>(`${this.baseUrl}/UserManagement/GetAllShifts`);
  }

  getShiftById(shiftId: number): Observable<ShiftMasterDto> {
    return this.http.get<ShiftMasterDto>(`${this.baseUrl}/UserManagement/GetShiftById/${shiftId}`);
  }

  addShift(model: ShiftMasterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/UserManagement/AddShift`, model);
  }

  updateShift(model: ShiftMasterDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/UserManagement/UpdateShift`, model);
  }

  deleteShift(shiftId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/UserManagement/DeleteShift/${shiftId}`);
  }

  activateShift(shiftId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/UserManagement/ActivateShift/${shiftId}`, {});
  }

  deactivateShift(shiftId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/UserManagement/DeactivateShift/${shiftId}`, {});
  }

  // -------------------------------
  // SHIFT ALLOCATION
  // -------------------------------
  getAllAllocations(): Observable<ShiftAllocationDto[]> {
    return this.http.get<ShiftAllocationDto[]>(`${this.baseUrl}/employee/GetshiftAllocationAll`);
  }

  getAllocationById(id: number): Observable<ShiftAllocationDto> {
    return this.http.get<ShiftAllocationDto>(`${this.baseUrl}/employee/GetshiftAllocationById/${id}`);
  }

  allocateShift(model: ShiftAllocationDto): Observable<any> {
    debugger;
    return this.http.post(`${this.baseUrl}/employee/AddAllocateShift`, model);
  }

  updateAllocation(model: ShiftAllocationDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/UpdateAllocation`, model);
  }

  deleteAllocation(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/DeleteAllocation?id=${id}`, {});
  }

  // ---------- KPI CATEGORY ----------
getKpiCategories() {
  return this.http.get(`${this.baseUrl}/MasterData/kpi-categories`);
}

getKpiCategoryById(id: number) {
  return this.http.get(`${this.baseUrl}/MasterData/kpi-categories/${id}`);
}

createKpiCategory(data: any) {
  return this.http.post(`${this.baseUrl}/MasterData/CreateKpiCategory`, data);
}

updateKpiCategory(data: any) {
  return this.http.post(`${this.baseUrl}/MasterData/UpdateKpiCategory`, data);
}

deleteKpiCategory(id: any) {
  return this.http.post(`${this.baseUrl}/MasterData/DeleteKpiCategory?id=${id}`, {});
}

//------------------------------EmployeeMasterService-------------------------------------//
getAllEmployees() {
  return this.http.get<EmployeeMaster[]>(
    `${environment.apiUrl}/UserManagement/GetAllEmployees`
  );
}

createEmployee(dto: EmployeeMaster) {
  return this.http.post(
    `${environment.apiUrl}/UserManagement/CreateEmployee`,
    dto
  );
}

updateEmployee(id: number, dto: EmployeeMaster) {
  return this.http.post(
    `${environment.apiUrl}/UserManagement/UpdateEmployee/${id}`,
    dto
  );
}

deleteEmployee(id: number) {
  return this.http.post(
    `${environment.apiUrl}/UserManagement/DeleteEmployee/${id}`,
    {}
  );
}

getManagers() {
  return this.http.get<ManagerDropdown[]>(
    `${environment.apiUrl}/UserManagement/GetManagers`
  );
}
//------------------------------My Team Hierarchy Service-------------------------------------//
getMyTeam(managerUserId: number): Observable<TeamHierarchyDto> {
  return this.http.get<TeamHierarchyDto>(`${environment.apiUrl}/UserManagement/MyTeam/${managerUserId}`);
}

 // ================= CERTIFICATION TYPE =================

getCertificationTypes(companyId: number, regionId: number) {
  return this.http.get<any>(
    `${this.baseUrl}/MasterData/certification-types?companyId=${companyId}&regionId=${regionId}`
  );
}



createCertificationType(data: CertificationType) {
  return this.http.post(
    `${this.baseUrl}/MasterData/CreateCertificationType`,
    data
  );
}

updateCertificationType(id: number, data: CertificationType) {
  return this.http.post(
    `${this.baseUrl}/MasterData/UpdateCertificationType`,
    data
  );
}

// DELETE (HARD DELETE – no query params)
deleteCertificationType(id: number) {
  return this.http.post(
    `${this.baseUrl}/MasterData/DeleteCertificationType?id=${id}`,
    {}
  );
}
// ---------------- CLOCK IN / CLOCK OUT ----------------

getTodayAttendanceSummary(employeeCode: string) {
  return this.http.get<{ clockIn: string, clockOut: string, totalHours: string }>(
    `${this.baseUrl}/Attendance/TodaySummary/${employeeCode}`
  );
}
changePassword(payload: ChangePasswordRequest): Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/UserManagement/change-password`, payload, { withCredentials: true });
}

// Captcha validation
 captchaValidation(): string {
  return `${this.baseUrl}/UserManagement/Captcha?` + new Date().getTime();
 }
getAllClockInOutRecords() {
  return this.http.get<any[]>(`${this.baseUrl}/Attendance/GetAll`);
}
// Update Clock In / Clock Out entry
updateClockInOut(id: number, data: { clockIn: string, clockOut: string, totalHours: string }) {
  return this.http.put(`${this.baseUrl}/Attendance/Update/${id}`, data);
}

// Delete attendance record
deleteClockInOut(id: number) {
  return this.http.delete(`${this.baseUrl}/Attendance/Delete/${id}`);
}
 getTodayAttendance(employeeCode: string, companyId: number, regionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Attendance/GetTodayByEmployee`, {
      params: { employeeCode, companyId, regionId }
    });
  }

  createClockInOut(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Attendance/CreateClockInOut`, payload);
  }
   submitDemoRequest(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/UserManagement/DemoRequest', data);
  }
// BULK UPLOAD
bulkUploadCertificationTypes(data: CertificationType[]): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/MasterData/certification-types/bulk`,
    data
  );
}

  ViewDocument(documentPath: string, download = false): void {
    if (!documentPath) return;

  const baseUrl = environment.baseurl;
  const cleanPath = documentPath.startsWith('/')
    ? documentPath.substring(1)
    : documentPath;

  const fileUrl = `${baseUrl}/${cleanPath}`;

  if (download) {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = this.getFileName(cleanPath);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.open(fileUrl, '_blank');
  }
  }
  private getFileName(path: string): string {
  return path.split('/').pop() || 'download';
}



}
