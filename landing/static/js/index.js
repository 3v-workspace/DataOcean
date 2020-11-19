// import * as THREE from 'three';
import DOTS from 'vanta/dist/vanta.dots.min';
import $ from 'jquery';
import 'jquery-validation';
// import 'jquery-modal';

$(document).ready(() => {
    setInterval(() => {
        setTimeout(() => {
            $('#explore').addClass('transparency')
            setTimeout(() => {
                $('#explore').removeClass('transparency')
            }, 1500)
        }, 1000);
        
        setTimeout(() => {
            $('#build').addClass('transparency')
            setTimeout(() => {
                $('#build').removeClass('transparency')
            }, 1500)
        }, 2500);
    
        setTimeout(() => {
            $('#develop').addClass('transparency')
            setTimeout(() => {
                $('#develop').removeClass('transparency')
            }, 1500)
        }, 4500);
    }, 5000);
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

let contactFormRules = {
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
            number: true,
            minlength: 10,
            maxlength: 15
        },
        question: {
            required: true,
        },
    }
}

let contactFormSchemeUk = {
    ...contactFormRules,
    messages: {
        username: {
            required: "Будь ласка, введіть Ваше ім\'я",
            minlength: "Замала кількість символів",
        },
        surname: {
            required: "Будь ласка, введіть Ваше прізвище",
            minlength: "Замала кількість символів",
        },
        email: {
            required: "Будь ласка, введіть адресу",
            email: "Будь ласка, введіть коректно адресу",
        },
        phone: {
            required: "Будь ласка, введіть коректний номер телефону",
            number: "Будь ласка, введіть коректний номер телефону",
            minlength: "Замала кількість символів",
            maxlength: "Завелика кількість символів",
        },
        question: {
            required: "Будь ласка, поставте своє запитання",
        }
    }
}

let contactFormSchemeEn = {
    ...contactFormRules,
    messages: {
        username: {
            required: "Enter your First Name, please",
            minlength: "Too few symbols",
        },
        surname: {
            required: "Enter your Last Name, please",
            minlength: "Too few symbols",
        },
        email: {
            required: "Enter your email, please",
            email: "Enter your correct email, please",
        },
        phone: {
            required: "Enter your number, please",
            number: "Enter your correct number, please",
            minlength: "Too few symbols",
            maxlength: "Too many symbols",
        },
        question: {
            required: "Ask us your question, please",
        }
    }
}

$('#contact-form').submit(function(event){
    event.preventDefault();

    const userLang = localStorage.getItem('lang');
    let contactForm = contactFormSchemeEn;
    if (userLang === 'uk') {
        contactForm = contactFormSchemeUk;
    }

    if (!$(this).validate(contactForm)) {
         return $(this).parents
    }

    let form = $('#contact-form');
    let data = {
            name: this.username.value + ' ' + this.surname.value,
            email: this.email.value,
            subject: this.phone.value,
            message: this.question.value,
    }

    $.ajax({
        url: "https://dataocean-ipa.ml/api/landing_mail/",
        type: "POST",
        dataType: "json",
        data: data,
        success: function(data, status, xhr) {
            if (xhr.status !== 200) {
                return
            }
            if (userLang === 'uk') {
                alert('Тепер Ви будете в курсі всіх новин про DataOcean!');
            } else 
                alert('Now you will be able to keep up with all of DataOcean updates!');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            if (jqXhr.status === 400 || jqXhr.status === 503) {
                if (userLang === 'uk') {
                    alert('Помилка. Дані не відправлені');
                } else 
                    alert('Error. Data isn\'t sent');    
            }
            else {
                if (userLang === 'uk') {
                    alert('Невідома помилка: ' + errorMessage);
                } else 
                    alert('Unknown error: ' + errorMessage);
            };
        }
    })
});

const allowedLanguages = ['uk', 'en'];

function changeLanguage (langCode) {
    $('#select_language').val(langCode);
    if (allowedLanguages.includes(langCode)) {
        $("[lang]").each(function () {
            if ($(this).attr("lang") === langCode) {
                $(this).show();
                if (langCode === 'uk') {
                    $('#name')[0].placeholder = 'Петро';
                    $('#surname')[0].placeholder = 'Іваненко';
                    $('#question')[0].placeholder = 'Привіт, Data Ocean! Я хотів запитати...';
                } else {
                    $('#name')[0].placeholder = 'John';
                    $('#surname')[0].placeholder = 'Galt';
                    $('#question')[0].placeholder = 'Hello, Data Ocean! I would like to ask about...';
                }
            }
            else
                $(this).hide();
        });
    } else {
        throw new Error("LangCode " + langCode + " not supported");
        }
}

$('#select_language').on("change", function() {
    const language = $(this).val();
    const userlang = window.localStorage.setItem('lang', language); 
    changeLanguage(language);
});

$(document).ready(() => {
    const langFromLocalStorage = localStorage.getItem('lang');
    if (allowedLanguages.includes(langFromLocalStorage)) {
        changeLanguage(langFromLocalStorage);
    } else {
        changeLanguage('uk');
    }
});
