(function () {

    const ErrorForm = window.ErrorForm;

    class ChangeImageForm {
        constructor(formEl) {
            this.imageForm = formEl.querySelector('.js-upload-image');
            this.isRightImage = false;
            this.selectedImage = null;
            this.err = document.querySelector('.js-error-form-image');
            this.validateImageBind = this.validateImage.bind(this);
            this.imageForm.addEventListener('change', this.validateImageBind);
            this.getFileNameBind = this.getFileName.bind(this);
            this.imageForm.addEventListener('change', this.getFileNameBind);
        }

        getFileName () {
            this.fileName = document.getElementsByClassName('js-profile-settings-file-name')[0].innerHTML = this.imageForm.files[0].name;
        }

        validateImage(evt) {
            this.selectedImage = this.imageForm.files[0];

            const MIME_TYPE = ['image/jpeg', 'image/png', 'image/jpeg'];

            if (MIME_TYPE.indexOf( this.selectedImage.type) === -1) {
                ErrorForm.displayErrors(this.err, 'Unknown file type, you can upload .jpg .jpeg .png');
                this.isRightImage = false;
                return;
            } else {
                ErrorForm.hideErrors(this.err);
                this.isRightImage = true;
            }

            const selectedImageSizeMB = this.selectedImage.size / 1024 / 1024;
            const maxImageSizeMB = 1;

            if (selectedImageSizeMB > maxImageSizeMB) {
                ErrorForm.displayErrors(this.err, `Too big file: ${selectedImageSizeMB.toFixed(2)}MB. Choose file less then ${maxImageSizeMB}MB.`);
                this.isRightImage = false;
            } else {
                ErrorForm.hideErrors(this.err);
                this.isRightImage = true;
            }
        }

        prepare() {
            const formData = new FormData();
            formData.append('file', this.selectedImage);
            return this.getError() ? false : formData;
        }

        getError() {
            return !this.isRightImage;
        }

        removeListeners() {
            ErrorForm.removeError(this.err);
            this.fileName.innerHTML = '';
            this.imageForm.removeEventListener('change', this.getFileNameBind);
            this.imageForm.removeEventListener('change', this.validateImageBind);
        }
    }

    window.ChangeImageForm = ChangeImageForm;
})();