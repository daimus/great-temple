const fileReader = new FileReader();

function removeExisting(event){
    const fileName = this.getAttribute('data-file');
    tmp = document.createElement('div');
    tmp.innerHTML = `<input type="hidden" name="pictureToRemove" value="${fileName}" />`;
    document.querySelector('.php-email-form').append(tmp.firstChild);
    document.getElementById(`thumb-${fileName}`).remove();
}

function createThumbnail(event) {
    console.log('changed');
    const input = this;

    const id = Math.floor(Math.random() * 10000);
    const file = event.target.files[0];
    fileReader.readAsDataURL(file);

    fileReader.onload = (e) => {
        if (file.type.match('image.*')) {
            thumbnail = document.getElementsByTagName('template')[0].content.cloneNode(true);
            thumbnail.querySelector('div').classList.add(`thumb-${id}`);
            thumbnail.querySelector('button').classList.add(`thumb-${id}`);
            thumbnail.querySelector('figcaption').innerHTML = file.name;
            thumbnail.querySelector('img').setAttribute('src', e.target.result);
            document.getElementById('thumbnailContainer').append(thumbnail);

            newInput = input.cloneNode(false);
            newInput.value = null;

            input.classList.add(`thumb-${id}`);
            input.classList.add('d-none');

            input.parentElement.append(newInput);

            newInput.addEventListener('change', createThumbnail);
            document.querySelector(`button.thumb-${id}`).addEventListener('click', () => {
                document.querySelectorAll(`.thumb-${id}`).forEach(element => element.remove());
            });
        } else {
            createAlert('Choosen file is not valid image!', 'warning', 'Warning!');
        }
    }
}

document.querySelector('.pictures').addEventListener('change', createThumbnail);
document.querySelectorAll('.removeExisting').forEach(element => element.addEventListener('click', removeExisting));

ClassicEditor.create(document.querySelector('#description'), {
    removePlugins: [ 'CKFinder', 'EasyImage', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'CKFinderUploadAdapter', 'MediaEmbed'],
    toolbar: ['selectAll', 'undo', 'redo', 'bold', 'italic', 'blockQuote', 'heading', 'indent', 'outdent', 'link', 'numberedList', 'bulletedList', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells']
}).catch(error => {
    createAlert(error, 'danger', 'Ouch!');
});