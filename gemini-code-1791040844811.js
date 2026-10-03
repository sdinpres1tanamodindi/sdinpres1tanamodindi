document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('settings.json');
    if (!response.ok) return;

    const settings = await response.json();

    Object.keys(settings).forEach(key => {
      const config = settings[key];
      const element = document.querySelector(`[data-cms="${key}"]`);

      if (element) {
        // Hide / Show
        element.style.display = config.is_visible ? '' : 'none';

        // Font Family, Color, Size
        element.style.fontFamily = config.font_family;
        element.style.color = config.font_color;
        element.style.fontSize = `${config.font_size}px`;

        // Mengubah teks judul/menu (jika elemen memiliki child target .cms-title)
        const titleEl = element.querySelector('.cms-title') || element;
        if (titleEl && config.menu_name) {
          titleEl.textContent = config.menu_name;
        }
      }
    });
  } catch (error) {
    console.error('Gagal memuat konfigurasi CMS:', error);
  }
});