import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NbLoginComponent, NbRegisterComponent, NbAuthService, NbAuthSocialLink } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of as observableOf ,Subscription} from 'rxjs';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent{
 public observable = observableOf(function subscribe(observer) {
  var id = setInterval(() => {
    observer.next('hi')
  }, 1000);
});


  public sms_code_massage = '发送';
  public user:any= {"username":'',"password":"","password2":"","sms_code":"","mobile":""};
  public username_massage:any=''
  public telephone_massage:any=''
  public sms_massage:any={}
  public time :number = 180;
  loadingMediumGroup:boolean = false
  registerload:boolean= false
  constructor(public http:HttpClient, private router: Router){
  }
// ob.subscribe({
//     next: d => console.log(d),
//     error: err => console.error(err),
// complete表示流结束，不再发射新的数据
//     complete: () => console.log('end of the stream')
// })

// var text = document.querySelector('#text');
// var inputStream = Rx.Observable.fromEvent(text, 'keyup') //为dom元素绑定'keyup'事件
//                     .debounceTime(250) // 防抖动
//                     .pluck('target', 'value') // 取值
//                     .switchMap(url => Http.get(url)) // 将当前输入流替换为http请求
//                     .subscribe(data => render(data)); //接收消息

// 注册事件
  register(){
    this.registerload = true
    this.http.post('/login/user_registered',this.user).subscribe((data:any) => {
    // this.http.post('/echart/test',this.user).subscribe((data:any) => {
        this.registerload=false
        console.log(data)
        if(data.id){
         this.router.navigate(['auth/login']);
        }else{
          this.username_massage = ''
         alert('错误')
        }
    },
    error =>{
      console.log(error.error.mobile)
      alert('错误')
      this.registerload=false
      this.telephone_massage = error.error.mobile[0]
      this.username_massage = error.error.username[0]
    }
    );
  }
  // 点击发送验证码
  smsCode(e: Event){
    if (/已发送/.test(this.sms_code_massage)||this.user.telephone == '' || !/^1(3|4|5|7|8)\d{9}$/.test(this.user.mobile)){
      return
    }
    this.loadingMediumGroup = true
    this.http.get('/login/sms_code/'+this.user.mobile).subscribe((data:any) => {
    // this.http.get('/echart/test').subscribe((data:any) => {
      this.sms_code_massage = '已发送'
      this.loadingMediumGroup = false
      var interval =  setInterval(()=>{
    if (this.time > 0) {
        this.time --;
        this.sms_code_massage = '已发送'+this.time
    } else {
        this.sms_code_massage = '发送'
        clearInterval(interval);
        this.time = 180; //重新初始化time
    }
}, 1000);
    },
    error=>{
      this.loadingMediumGroup = false
      alert('出现错误')
    }
    );
  }
}

 