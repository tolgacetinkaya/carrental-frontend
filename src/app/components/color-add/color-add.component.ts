import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })

    console.log(this.colorAddForm)
  }
  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message, "Successful")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      })
    }


    else {
      this.toastrService.error("Information is missing", "Attention")
    }
  }

}
