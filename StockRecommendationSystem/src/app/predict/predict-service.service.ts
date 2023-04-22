import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  constructor(private http: HttpClient) {}

  getPrediction(ticker: string): Observable<any> {
    // Replace the URL with the endpoint for your backend service
    const url = `https://your-backend-service-url.com/predict?ticker=${ticker}`;
    const url1 = `http://127.0.0.1:5000/data`;
    return this.http.get(url1);
  }
}
