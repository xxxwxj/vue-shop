import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  public flag: number;
  public noteDetial: string;
  public type: number;
  public time: string;
  public id: number;

  constructor(
    public route: ActivatedRoute,
    public http: HttpClient
  ) { }


  // 获取路由传参
  ngOnInit() {
    this.flag = 0;
    this.route.queryParams.subscribe((queryParams) => {
      this.id = queryParams.id;
      console.log(queryParams);
    });
    // 根据id获取本条便签
    this.http.get('assets/notes.json').subscribe((note) => {
      this.noteDetial = note['notes'][this.id]['data'];
      this.type = note['notes'][this.id]['type'];
      this.time = note['notes'][this.id]['time'];
    });
  }

  // 更改便签内容1
  check(text) {
    console.log('check');
    console.log(text);
    console.log(text.el.textContent);
    this.flag = 0;
  }


  // 输入框获取焦点
  focus() {
    console.log('focus');
    this.flag = 1;
  }


  // 返回上一级
  back() {
    window.history.back();
  }

}
