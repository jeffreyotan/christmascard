import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form: FormGroup;
  placeholderText: string;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      inputText: this.fb.control('', [ Validators.required ])
    });
    this.placeholderText = "eg. Ho Ho Ho..";
  }

  onClickSubmit(): void {
    const inputText = this.form.get('inputText').value;

    this.router.navigate(['/card'], {
      queryParams: {
        message: inputText
      }
    });
  }

}
