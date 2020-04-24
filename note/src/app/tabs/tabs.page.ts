import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public title = '全部笔记';
  public menuList = [];
  public noteSort = [];
  public notes = [];
  public item = [];
  public allNotes = 0;
  public collect = 0;
  public deleted = 0;
  public travel = 0;
  public person = 0;
  public life = 0;
  public work = 0;
  public undefined = 0;

  constructor(
    public router: Router,
    public menu: MenuController,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.getMenu();
    this.http.get('assets/notes.json').subscribe((notes) => {
      this.notes = notes['notes'];
      notes['notes'].forEach((note) => {
        const query = note['state'].indexOf(1) > -1;
        if (note['collect'].indexOf(1) > -1) {
          this.collect++;
        }
        if (note['state'].indexOf(0) > -1) {
          this.deleted++;
        }
        if (query) {
          this.allNotes++;
          this.item.push(note);
          if (note['type'].indexOf(0) > -1) {
            this.travel++;
          }
          if (note['type'].indexOf(1) > -1) {
            this.person++;
          }
          if (note['type'].indexOf(2) > -1) {
            this.life++;
          }
          if (note['type'].indexOf(3) > -1) {
            this.work++;
          }
          if (note['type'].indexOf(4) > -1) {
            this.undefined++;
          }
        }
      });
    });
  }

  // 菜单点击事件1
  sortChange(name, i) {
    this.title = name;
    this.item = [];
    this.notes.forEach((note) => {
      const state = note['state'].indexOf(1) > -1;
      if (state) {
        const sort = note['type'].indexOf(i) > -1;
        if (sort) {
          this.item.push(note);
        }
      }
    });
    this.menu.close();
  }

  // 菜单点击事件2
  stateChange(name) {
    this.title = name;
    this.item = [];
    if (name === '全部笔记') {
      this.notes.forEach((note) => {
        const state = note['state'].indexOf(1) > -1;
        if (state) {
          this.item.push(note);
        }
      });
    } else if (name === '我的收藏') {
      this.notes.forEach((note) => {
        const state = note['state'].indexOf(1) > -1;
        if (state) {
          const sort = note['collect'].indexOf(1) > -1;
          if (sort) {
            this.item.push(note);
          }
        }
      });
    } else {
      console.log(-1);
      this.notes.forEach((note) => {
        const state = note['state'].indexOf(0) > -1;
        console.log(state);
        if (state) {
          this.item.push(note);
        }
      });
    }
    this.menu.close();
  }

  // 新建便签
  detail() {
    this.router.navigate(['detail'], { queryParams: { type: 0 } });
  }


  // 获取菜单
  getMenu() {
    this.http.get('assets/menuList.json').subscribe((data) => {
      this.menuList = data['menuList'];
      this.noteSort = data['noteSort'];
    });
  }

  // 搜索便签
  searchNote(key) {
    this.item = [];
    const word = key.value.toLowerCase().trim();
    console.log(word === '');
    if (word !== '') {
      this.notes.forEach((note) => {
        const query = note['data'].toLowerCase().indexOf(word) > -1;
        if (query) {
          this.item.push(note);
        }
      });
    } else {
      this.item = this.notes;
    }
  }

  // 跳转到内容编辑页
  toDetail(i) {
    console.log('detail');
    console.log(i);
    this.router.navigate(['detail'], { queryParams: { id: i } });
  }

}
