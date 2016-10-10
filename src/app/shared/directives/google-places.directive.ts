import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

declare var google: any;

@Directive({
    selector: '[appGooglePlace]',
    providers: [NgModel],
    host: {
        '(input)': 'onInputChange()'
    }
})
export class GoogleplaceDirective {
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    modelValue: any;
    autocomplete: any;
    private _el: HTMLElement;


    constructor(el: ElementRef, private model: NgModel) {
        console.log('called');
        this._el = el.nativeElement;
        this.modelValue = this.model;
        let input = this._el;
        this.autocomplete = new google.maps.places.Autocomplete(input, {});
        google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
            let place = this.autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

    @HostListener('onInputChange')
    onInputChange() {
        console.log('changed');
    }
}
