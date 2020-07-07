class LandingPage {
  constructor() {
    this._animateDots();
    this._initSendmailForm();
    this._initSubscribeForm();
  }

  _animateDots() {
    VANTA.DOTS({
      el: ".do-welcome-section",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x2dff,
      color2: 0xffffff,
      backgroundColor: 0xffffff,
      size: 3.3,
      spacing: 12.0,
    });
  }

  _initSendmailForm() {
    const _sendMailBtn = document.querySelector(".sendmail-btn");
    _sendMailBtn.onclick = (e) => {
      e.preventDefault();
      const _form = document.forms.sendmail;
      console.log("Do sendmail");
      return false;
    };
  }

  _initSubscribeForm() {
    const _subscribeForms = document.querySelectorAll(".do-subscribe");
    _subscribeForms.forEach((form) => {
      const _subscribeBtn = form.querySelector(".subscribe-btn");
      _subscribeBtn.onclick = (e) => {
        e.preventDefault();
        console.log("Do Subscribe");
      };
    });
  }
}

new LandingPage();
