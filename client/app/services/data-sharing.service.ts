import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class DataSharing {

    private _selectedCriteria = new Subject<Object>();
    private _chosenCriteria = new Subject<Object>();
    private _selectedDate = new Subject<Object>();
    private _selectedHeadquarter = new Subject<Object>();
    private _selectedDivision = new Subject<Object>();
    private _selectedBrand = new Subject<Object>();
    private _selectedStockist = new Subject<Object>();
    private _selectedDoctor = new Subject<Object>();
    // private _modalTempRef = new Subject<Object>();

    private _filterSearch = new Subject<Object>();

    selectedCriteria$ = this._selectedCriteria.asObservable();
    chosenCriteria$ = this._chosenCriteria.asObservable();
    selectedDate$ = this._selectedDate.asObservable();
    selectedHeadquarter$ = this._selectedHeadquarter.asObservable();
    selectedDivision$ = this._selectedDivision.asObservable();
    selectedBrand$ = this._selectedBrand.asObservable();
    selectedStockist$ = this._selectedStockist.asObservable();
    selectedDoctor$ = this._selectedDoctor.asObservable();
    // modalTempRef$ = this._modalTempRef.asObservable();

    filterSearch$ = this._filterSearch.asObservable();

    loggedInStatus = new EventEmitter<string>();

    constructor() { }


    sendFilterSearch(search: Object){
        this._filterSearch.next(search);
    }

    sendChosenCriteria(criteria: Object) {
        this._chosenCriteria.next(criteria);
    }

    sendSelectedCriteria(criteria: Object) {
        this._selectedCriteria.next(criteria);
    }

    sendSelectedDate(date: Object){
        this._selectedDate.next(date);
    }

    sendSelectedHeadquarter(headquarter: Object){
        this._selectedHeadquarter.next(headquarter);
    }

    sendselectedDivision(division: Object){
        this._selectedDivision.next(division);
    }
   
    sendselectedBrand(brand: Object){
        this._selectedBrand.next(brand);
    }

    sendselectedStockist(stockist: Object){
        this._selectedStockist.next(stockist);
    }

    sendselectedDoctor(doctor: Object){
        this._selectedDoctor.next(doctor);
    }

    // sendModalReference(temp:object){
    //     this._modalTempRef.next(temp);
    // }
}