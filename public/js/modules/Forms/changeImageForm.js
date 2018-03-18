(function () {

    const ErrorForm = window.ErrorForm;

    class ChangeImageForm {
        constructor(formEl) {
            this.imageForm = formEl.querySelector('.js-upload-image');

            this.image = false;
            this.selectedImage = null;
            this.err = document.querySelector('.errorFormImage');
            this.validateImageBind = this.validateImage.bind(this);
            this.imageForm.addEventListener('change', this.validateImageBind);
            this.getFileNameBind = this.getFileName.bind(this);
            this.imageForm.addEventListener('change', this.getFileNameBind);
        }

        getFileName () {
            let file = this.imageForm.files[0].name;
            document.getElementsByClassName('fileName')[0].innerHTML = file;
        }

        validateImage(evt) {
            console.log('dddd');
            this.selectedImage = this.imageForm.files[0];
            const selectedImageMimeType = this.selectedImage.type;

            if (selectedImageMimeType !== 'image/jpg' && selectedImageMimeType !== 'image/jpeg' && selectedImageMimeType !== 'image/png') {
                ErrorForm.displayErrors(this.err, 'Unknown file type, you can upload .jpg .jpeg .png');
                this.image = false;
                return;
            } else {
                ErrorForm.hideErrors(this.err);
                this.image = true;
            }
            const selectedImageSizeB = this.selectedImage.size;
            const selectedImageSizeMB = selectedImageSizeB / 1024 / 1024;

            const maxImageSizeMB = 2;
            const maxImageSizeB = maxImageSizeMB * 1024 * 1024;

            if (selectedImageSizeB > maxImageSizeB) {
                ErrorForm.displayErrors(this.err, 'Размер изображения слишком велик: ' + selectedImageSizeMB.toFixed(2) + ' MB. \n' +
                    '                    Выберите изображение, размер которого меньше 2 MB.');
                this.image = false;
            } else {
                ErrorForm.hideErrors(this.err);
                this.image = true;
            }
        }

        prepare() {
            const formData = new FormData();
            formData.append('file', this.selectedImage);
            return this.getError() ? false : formData;
        }

        getError() {
            return !this.image;
        }

        removeListeners() {
            ErrorForm.removeError(this.err);
            this.imageForm.removeEventListener('change', this.getFileNameBind);
            this.imageForm.removeEventListener('change', this.validateImageBind);
        }
    }

    window.ChangeImageForm = ChangeImageForm;
})();