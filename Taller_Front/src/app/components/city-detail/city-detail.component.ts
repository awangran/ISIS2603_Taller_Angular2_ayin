import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city.model';
import { WeatherRecord } from '../../models/weather-record.model';
import { WeatherRecordService } from '../../services/weather-record.service';
import { WeatherDetail } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {
  private weatherRecordService = inject(WeatherRecordService);
  private weatherService = inject(WeatherService);

  @Input() city!: City;

  weatherRecords: WeatherRecord[] = [];
  weatherDetail: WeatherDetail | null = null;
  loading: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.weatherRecordService.getRecords(this.city.id)
        .subscribe(records => this.weatherRecords = records);
      this.loading = true;
      this.weatherDetail = null;
      this.weatherService.getWeather(this.city.name).subscribe({
        next: detail => {
          this.weatherDetail = detail;
          this.loading = false;
        },
        error: () => {
          this.weatherDetail = null;
          this.loading = false;
        }
      });
    }
  }

  saveWeather(): void {
    // TODO HU-04: Agregar aquí el código para guardar un nuevo registro de clima
    //             Al completar, recarga la lista con weatherRecordService.getRecords(this.city.id).
  }
}
