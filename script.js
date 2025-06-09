// Modal preview logic

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const previewFrame = document.getElementById('previewFrame');
const modalClose = document.getElementById('modalClose');
if(modalClose){
  modalClose.addEventListener('click', closeModal);
}
if(modalOverlay){
  modalOverlay.addEventListener('click', e => {
    if(e.target === modalOverlay) {
      closeModal();
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if(e.key === "Escape" && modalOverlay && modalOverlay.classList.contains('active')){
    closeModal();
  }
});

function closeModal(){
  if(modalOverlay){
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden','true');
    // Clear iframe src to stop loading
    if(previewFrame){
      previewFrame.src = '';
    }
  }
}

const previewButtons = document.querySelectorAll('.preview-btn');
previewButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.getAttribute('data-title');
    const file = btn.getAttribute('data-file');
    showPreviewModal(title,file);
  });
});

function showPreviewModal(title,file){
  if(!modalOverlay || !modalTitle || !previewFrame) return;
  modalTitle.textContent = title;
  // Show file inside iframe - assuming PDF or embeddable format
  previewFrame.src = file;
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden','false');
  previewFrame.focus();
}