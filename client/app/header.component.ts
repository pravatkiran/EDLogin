import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../components/auth/auth.service';
import { Router, Data, ActivatedRoute, Params } from '@angular/router';
import { DataSharing } from './services/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-header',
    template: require('./header.html'),
    providers: [NgbModalConfig, NgbModal]

})
export class HeaderComponent implements OnInit, AfterViewInit {

    customerId;
    currentRole: any;
    show: boolean = false;
    view: boolean = false;
    head: boolean = false;
    showHome: boolean = false;
    company: boolean = false;
    companyId: any;
    // modalContent:any;
    static parameters = [AuthService, Router, DataSharing, HttpClient, ActivatedRoute, NgbModalConfig, NgbModal, DataSharing];
    constructor(
        private authService: AuthService,
        private router: Router,
        private dataSharing: DataSharing,
        private http: HttpClient,
        private route: ActivatedRoute,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        private dataService: DataSharing
    ) {

        $(document).ready(function () {
            var windowWidth = $(window).width();
            $('.header_toggle_handler_ui').on('click', function (e) {
                event.preventDefault();
                if ($('.header_toggle_handler_ui').is(':visible')) {
                    $(this).animate({ top: '0' }).addClass('rotate_arrow');
                    $(this).removeClass('header_toggle_handler_ui');
                    $('.header_ui').animate({ top: '-60px' });
                    $('.right_content_wrapper_ui').animate({ 'margin-top': '0' });
                    $('.menudiv').addClass('active');
                }
                else {
                    $(this).animate({ top: '60px' }).removeClass('rotate_arrow');
                    $(this).addClass('header_toggle_handler_ui');
                    $('.header_ui').animate({ top: '0' });
                    $('.right_content_wrapper_ui').animate({ 'margin-top': '60px' });
                    $('.menudiv').removeClass('active');
                }
            });


        });
    }

    ngOnInit() {

        this.dataService.loggedInStatus.subscribe(
            (status: string) => {
                console.log('data sharing', status);
                if (status == 'home') {
                    this.head = true;
                } else {
                    this.head = false;
                }
            }
        )

        this.route.queryParams.subscribe(
            (param: Params) => {
                if (param['customerId'] == 0) {
                    this.view = false;
                    this.company = false;
                } else if (param['companyId'] == undefined) {
                    this.view = true;
                } else if (param['companyId'] !== null) {
                    this.view = false;
                    this.company = true;
                }


                if (param['customerId'] !== undefined) {
                    this.head = true;
                }
                this.customerId = param.customerId;
            }
        )
        this.customerId = sessionStorage.getItem('customerId') !== null ? sessionStorage.getItem('customerId') : this.route.snapshot.queryParamMap.get('customerId');;

        this.companyId = this.authService.currentUserValue.company_id;        // if (this.route.snapshot.queryParamMap.get('companyId') !==null){
        //     this.head = true;
        //     this.company= true;
        //     this.view = false;
        //     console.log('initial companyid');
        // }
        // if (this.companyId !== null) {
        //     this.head = true;
        //     // this.view = false;
        //     this.company = true;
        //     console.log('companyid', this.companyId);
        // }

        if (this.authService.currentUserValue.customerId == 0 || this.companyId !== null) {
            // this.head = false;
            // console.log('head status', this.head);
            if (parseInt(sessionStorage.getItem('customerId')) == 0) {
                // this.head = true;
                this.view = false;
                this.company = false;
            } else if (this.companyId !== null) {
                this.view = false;
                this.head = true;
            }
            else {
                // this.head = true;
                this.view = true;
            }
            this.view = false;
        }
        else {
            // this.head = true;
            this.view = true;
            // console.log('customerId in case of null on initial', this.authService.currentUserValue.customerId);
            this.customerId = this.authService.currentUserValue.customerId;
        }

        if (this.authService.currentUserValue.customerId == 0) {
            this.showHome = true;
        }
        console.log('enteroinit session storage status', sessionStorage.getItem('enteroInit'));
        if (parseInt(sessionStorage.getItem('enteroInit')) == 0) {
            this.head = true;
            console.log('enteroinit');
        }

        // this.getRoleById();

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    ngAfterViewInit() {
        console.log('home id', sessionStorage.getItem('home'));
        console.log('view status', this.view);
    }

    getUserLists() {
        console.log('customerid', this.customerId);
        if (this.customerId == 0 || this.customerId == null) {
            console.log('if customerId == 0 || customerId == null')
            this.view = false;
            console.log('companyId', this.companyId);
            if (this.companyId == null) {
                this.router.navigate(['/user-list'], {
                    queryParams: { 'customerId': this.customerId }
                }).then(() => {
                });
            } else {
                this.router.navigate(['/user-list'], {
                    queryParams: { 'companyId': this.companyId }
                }).then(() => {
                    console.log('promise from companyId resolved.');
                })
            }
        } else {
            console.log('else');
            this.view = true;
            this.router.navigate(['/user-list'], {
                queryParams: { 'customerId': this.customerId }
            }).then(() => {
                // this.view = true;
            });
        }
        // console.log('get user list view', this.view);
        // if (this.customerId !== undefined || this.customerId !== null) {
        //     console.log('customerId');

        // } else {
        //     console.log('else  companyid');

        // }
    }

    getRoleById() {
        console.log('userroletypeid', this.authService.currentUserValue.userroletypeid);
        this.http.get('/api/users/getRoleById/' + this.authService.currentUserValue.userroletypeid)
            .subscribe((res: any) => {
                this.currentRole = res[0].userrolename.toLowerCase();
                console.log('currentRole', this.currentRole);
                if (this.currentRole == 'admin') {
                    this.show = true;
                } else {
                    this.show = false;
                }
                console.log('this.currentRole', this.currentRole);
            })
    }

    enteroHome() {
        // console.log('button clicked');
        // console.log('modalcontent', this.modalContent);
        // this.modalService.open(this.modalContent, { windowClass: 'modalbox'});
        this.router.navigate(['/entInit']).then(() => {
            this.head = false;
            sessionStorage.setItem('enteroInit', '0');
            // window.location.reload();
        })
    }

}