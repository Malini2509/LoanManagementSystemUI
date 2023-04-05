import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { EmiDetails } from './emi-calculator.model';
import { Chart, ChartOptions, registerables } from 'chart.js';

// Register the pie chart type
Chart.register(...registerables);

// Import the PieController
import { PieController } from 'chart.js';

// Register the PieController
Chart.register(PieController);

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {

  totalEmi: number = 0;
  showEmiDetails = false;
  emi: EmiDetails | undefined = undefined;
  @ViewChild('chart') chartCanvas!: ElementRef;

  calculator = new FormGroup({
    timePeriod: new FormControl('', [Validators.required, Validators.max(5)]),
    principleAmount: new FormControl('', [Validators.required, Validators.max(3000000)]),
    intrestRate: new FormControl('', [Validators.required, Validators.max(25)])
  });

  // Store a reference to the chart instance
  chart: Chart<'pie'> | undefined;

  constructor(private userService: UserService) { }

  onSubmit() {
    if (this.calculator.valid) {
      this.userService.emiCalculator(this.calculator.value).subscribe((result) => {
        console.log(result);
        this.emi = result as EmiDetails;
        this.totalEmi = this.emi.totalIntrestPayable;
        this.showEmiDetails = true; // Set showEmiDetails to true

        // Check if the chart has already been created
        if (this.chart) {
          // Update the chart data
          this.chart.data.datasets[0].data = [
            Number(this.calculator.value.principleAmount),
            this.totalEmi,
          ];
          this.chart.update();
        } else {
          setTimeout(() => {
            this.createChart(this.calculator.value.principleAmount, this.totalEmi);
          }, 0);
        }
      });
    } else {
      this.calculator.markAllAsTouched();
    }
  }

  createChart(principalAmount: any, totalEMI: number) {
    const totalAmount = Number(principalAmount) + totalEMI;
    const principalAmountPercentage = ((Number(principalAmount) / totalAmount) * 100).toFixed(2);
    const totalEmiPercentage = ((totalEMI / totalAmount) * 100).toFixed(2);
    const data = {
      labels: [`${principalAmountPercentage}% Principle Amount`, `${totalEmiPercentage}% Total EMI`],
      datasets: [
        {
          data: [Number(principalAmount), totalEMI],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions<'pie'> = {
      plugins: {
        title: {
          display: true,
          text: 'Breakup-up of Total Payment',
        },
      },
    };

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
  }
}
