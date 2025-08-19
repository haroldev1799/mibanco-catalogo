import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core'
import { NgClass } from '@angular/common'

export interface Option<T> {
    label: string
    value: T
}

export interface SelectData<T> {
    label: string
    name: string
    placeholder: string
    required?: boolean
    options: Option<T>[]
    selected?: Option<T>
}

@Component({
    selector: 'app-select',
    standalone: true,
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    imports: [NgClass],
})
export class SelectComponent<T> {
    @Input() data!: SelectData<T>
    @Input() readonly: boolean = false
    @Input() error: boolean = false
    @ViewChild('options', { static: false }) options!: ElementRef
    @Output() selected = new EventEmitter<T>()
    @Output() emitFocus = new EventEmitter()

    showOptions: boolean = false
    selectedOne: Option<T> | undefined

    toggleOptions(event: Event) {
        this.handleFocus()
        if (this.readonly) return
        event.stopPropagation()
        this.showOptions = !this.showOptions
    }

    handleFocus() {
        this.emitFocus.emit()
    }

    selectOption(option: Option<T>, event: Event) {
        event.stopPropagation()
        this.data.selected = option
        this.showOptions = false
        this.selectedOne = option
        this.selected.emit(option.value)
    }

    @HostListener('document:click', ['$event'])
    handleClick(event: Event): void {
        if (this.options && !this.options.nativeElement.contains(event.target)) this.showOptions = false
    }
}
