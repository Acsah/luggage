// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers } from "@angular/http";
import { ConfigProvider } from "../config/config";

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {

  //实例化 Headers
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http, public config: ConfigProvider, public jsonp: Jsonp) {
    console.log('Hello HttpServicesProvider Provider');
  }



  requestData(apiUrl, callback) {
    let api = '';
    if (apiUrl.indexOf('?') == -1) {
      api = this.config.apiUrl + apiUrl + '?callback=JSONP_CALLBACK'
    } else {
      api = this.config.apiUrl + apiUrl + '&callback=JSONP_CALLBACK'
    }
    console.log('请求URL:' + api);
    this.jsonp.get(api).subscribe(data => {
      console.log("返回数据：" + data['_body']);
      callback(data['_body']);
    }, err => {
      console.log(err);
    })

  }

  //发送post请求
  postData(url, data, callback) {
    let apiUrl = this.config.apiUrl + url;
    let jsonData = JSON.stringify(data);
    console.log('发送数据：'+jsonData);
    this.http.post(apiUrl, jsonData, { headers: this.headers }).subscribe(res => {
      console.log('返回数据：' + res['_body'])
      callback(JSON.parse(res['_body']));
    })
  }




}
