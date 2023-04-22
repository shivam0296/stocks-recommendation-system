import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { PredictService } from './predict-service.service';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  capital: string = " ";
  roi: string = " ";
  time: string = " ";
  showForm: boolean = true;
  loading:boolean = false;

  // prediction: Prediction | undefined;
  data: any;
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    
    this.http.post('http://127.0.0.1:5000/api/submit', {body:{'value':'AAPL'}},{headers: new HttpHeaders({'Content-Type': 'application/json'}), 'responseType': 'json'})
      .pipe(
        map(response => JSON.stringify(response)),
        catchError(error => {
          console.log('==========TEST=====================');
          console.log(error);
          return error;
        }),timeout(90000)
      ).subscribe((data:any)=>{
        this.data = JSON.parse(data);
        console.log(this.data);
      });
      console.log(this.loading);
      return this.data;
  }
  
  async onSubmit(form: NgForm) {
    
    if (form.invalid) {
      return;
    }
    this.showForm = false;
    // this.prediction = {
    //   ticker: this.ticker.toLowerCase(),
    //   arr: [1,2,3,4,5],
    //   prediction: 2389
    // };
    // this.http.get('http://127.0.0.1:5000/api/data/').subscribe(data => {
    //   this.data = data;
    //   console.log("got data succesfully:");
    // });
    this.loading = true;
    console.log(this.loading);
    const value = await this.getData();    
    console.log(this.data);
    if(value != null){ this.loading = false;
      console.log(this.loading);
    }
    // this.data = (JSON.stringify(this.getData()));
    // console.log("data:"+this.data);
    // this.predictService.getPrediction(this.ticker).subscribe((prediction: Prediction) => {
    //   this.prediction = prediction;
    // });
  }

}
