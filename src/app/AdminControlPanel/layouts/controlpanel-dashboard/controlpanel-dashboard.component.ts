import { Component } from '@angular/core';

@Component({
  selector: 'app-controlpanel-dashboard',
  standalone: false,
  templateUrl: './controlpanel-dashboard.component.html',
  styleUrl: './controlpanel-dashboard.component.css'
})
export class ControlpanelDashboardComponent {

  stats = [
    { title: 'Total Projects', value: 12 },
    { title: 'Active Users', value: 45 },
    { title: 'Open Issues', value: 18 },
    { title: 'Completed Tests', value: 320 }
  ];

  activities = [
    { date: 'Jan 31', value: 60 },
    { date: 'Feb 1', value: 180 },
    { date: 'Feb 2', value: 150 },
    { date: 'Feb 3', value: 350 },
    { date: 'Feb 4', value: 0 },
    { date: 'Feb 5', value: 20 }
  ];
}
