import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  public flag: number;
  public hour;
  public minutes;
  public day;
  public id;
  public stars = 0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient
  ) { }


  // 获取路由传参
  ngOnInit() {
    this.hour = new Date().getHours();
    this.minutes = new Date().getMinutes();
    this.minutes = this.minutes > 9 ? this.minutes : '0' + this.minutes;
    this.day = this.hour + ':' + this.minutes;
    this.flag = 1;
  }

  // 新增便签
  add(text, sort) {
    this.flag = 0;
    if (!this.id) {
      if (text.el.value.trim() !== '') {
        let note = {
          type: sort.el.value,
          state: '1',
          collect: '0',
          time: this.day,
          data: text.el.value.trim()
        };
        this.http.post('http://localhost:3000/notes', note).subscribe(res => {
          this.id = res['id'];
          console.log(this.id);
          console.log(res);
        });
      } else {
        this.flag = 1;
        this.router.navigate(['home'], { queryParams: { refresher: 1 } });
      }
    } else {
      if (text.el.value.trim() !== '') {
        let note = {
          type: sort.el.value,
          state: '1',
          collect: '0',
          time: this.day,
          data: text.el.value.trim()
        };
        this.http.put('http://localhost:3000/notes/' + this.id, note).subscribe(res => {
          console.log(res);
        });
      } else {
        this.flag = 1;
        let note = {
          type: sort.el.value,
          state: '0',
          collect: '0',
          time: this.day,
          data: text.el.value.trim()
        };
        this.http.put('http://localhost:3000/notes/' + this.id, note).subscribe(res => {
          console.log(res);
          this.router.navigate(['home'], { queryParams: { refresher: 1 } });
        });
      }
    }

  }

  // 收藏笔记
  star(text, sort) {
    if (this.stars === 0) {
      let note = {
        type: sort.el.value,
        state: '1',
        collect: '1',
        time: this.day,
        data: text.el.value.trim()
      };
      this.http.put('http://localhost:3000/notes/' + this.id, note).subscribe(res => {
        console.log(res);
        this.stars = 1;
      });
    }
    if (this.stars === 1) {
      let note = {
        type: sort.el.value,
        state: '1',
        collect: '0',
        time: this.day,
        data: text.el.value.trim()
      };
      this.http.put('http://localhost:3000/notes/' + this.id, note).subscribe(res => {
        console.log(res);
        this.stars = 0;
      });
    }
  }

  // 删除笔记
  deleteNote(text, sort) {
    let note = {
      type: sort.el.value,
      state: '0',
      collect: '0',
      time: this.day,
      data: text.el.value.trim()
    };
    this.http.put('http://localhost:3000/notes/' + this.id, note).subscribe(res => {
      console.log(res);
      this.router.navigate(['home'], { queryParams: { refresher: 1 } });
    });
    // this.http.delete('http://localhost:3000/notes/' + this.id).subscribe(res => {
    //   this.router.navigate(['home'], { queryParams: { refresher: true } });
    // });
  }



  // 输入框获取焦点
  focus() {
    this.flag = 1;
    console.log('focus');
  }


  // 返回上一级
  back() {
    this.router.navigate(['home'], { queryParams: { refresher: 1 } });
  }

}
