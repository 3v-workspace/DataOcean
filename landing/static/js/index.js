// import * as THREE from 'three';
import DOTS from 'vanta/dist/vanta.dots.min';
import $ from 'jquery';
import 'jquery-validation';
import 'jquery-modal';


$(document).ready(() => {
  DOTS({
    el: '.landing-dots__inner',
    mouseControls: true,
    touchControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1,
    scaleMobile: 1.0,
    color: 0x2dff,
    color2: 0xffffff,
    backgroundColor: 0xffffff,
    size: 3,
    spacing: 15,
    // THREE: THREE,
  });
});


$(document).ready(() => {
  // const _sendMailBtn = document.querySelector(".sendmail-btn");
  // _sendMailBtn.onclick = (e) => {
  //   e.preventDefault();
  //   const _form = document.forms.sendmail;
  //   console.log("Do sendmail");
  //   return false;
  // };
});


$(document).ready(() => {
  // const _subscribeForms = document.querySelectorAll(".do-subscribe");
  // _subscribeForms.forEach((form) => {
  //   const _subscribeBtn = form.querySelector(".subscribe-btn");
  //   _subscribeBtn.onclick = (e) => {
  //     e.preventDefault();
  //     console.log("Do Subscribe");
  //   };
  // });
});

let contactFormScheme = {
	    errorClass: "input_error",
		rules: {
            username: {
                required: true,
		        minlength: 2,
            },
			surname: {
			    required: true,
			    minlength: 2,
			},
			email: {
			    required: true,
			    email: true,
			},
			phone: {
			    required: true,
			    minlength: 10,
			    maxlength: 15
            },
            question: {
                required: true,
            },
	    },
		messages: {
			username: {
				required: 'Будь ласка, введіть Ваше ім\'я',
				minlength: 'Замала кількість символів',
			},
			surname: {
				required: "Будь ласка, введіть Ваше прізвище",
				minlength: 'Замала кількість символів',
			},
			email: {
				required: "Будь ласка, введіть адресу",
				email: "Будь ласка, введіть коректно адресу"
			},
            phone: {
                required: "Будь ласка, введіть коректний номер телефону",
                minlength: "Замала кількість символів",
                maxlength: "Завелика кількість символів"
            },
            question: {
                required: "Будь ласка, поставте своє запитання"
            }
		},
}

$('#contact-form').submit(function(event){
        event.preventDefault();
        if (!$(this).validate(contactFormScheme)) {
            return
        }
        let form = $('#contact-form');
        let data = {
               name: this.username.value + ' ' + this.surname.value,
               email: this.email.value,
               subject: this.phone.value,
               message: this.question.value,
        }

        $.ajax({
            url: "https://ipa.dataocean.us/api/landing_mail/",
            type: "POST",
            dataType: "json",
            data: data,
            success: function(data, status, xhr) {
                if (xhr.status !== 200) {
                    return
                }
                alert('Тепер Ви будете в курсі всіх новин про DataOcean!');
            },
            error: function (jqXhr, textStatus, errorMessage) {
                if (jqXhr.status === 400 || jqXhr.status === 503) {
                    alert('Помилка. Дані не відправлені');
                }
                else {
                    alert('Невідома помилка: ' + errorMessage)
                };
            }
        });
});
