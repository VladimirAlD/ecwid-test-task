# Ecwid test task
Требования к странице
* Компонент загрузки картинок. Реализовать в виде поля ввода и кнопки “Загрузить”. В поле можно ввести урл до картинки или загрузить файл со списком картинок. Формат файла — JSON. Можно использовать данный файл (https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json)
* Галерея картинок. Реализовать в виде упорядоченного набора превью всех картинок, загруженных в галерею.

Требования к галерее
* Количество рядов и картинов в них не ограничено.
* Ряды должны быть одинаковы по ширине, но могут различаться по высоте. 
* Все картинки в одном ряду должны быть одинаковы по высоте.
* У картинок должны быть сохранены пропорции.
* Максимальная ширина контейнера — 860 px, минимальная – 320 px.
* Количество картинок в каждом ряду не фиксировано. При сужении/расширении галереи их количество может меняться. 
* На мобильных картинки не должны быть слишком мелкими, на десктопах – слишком крупными.
* Следует добавить плейсхолдеры на время загрузки.
* Возможность добавить картинку drag-n-drop в уже готовую загруженную галерею.
* Возможность удалить картинку из галереи.
* Не использовать сторонние библиотеки построения галереи, которые выполняют поставленную задачу.

Требования к верстке
* Поддержка браузеров: две последние мажорные версии (FF, Chrome, IE).
* Необходимо использовать соглашение по именованию BEM.
* Использование CSS-препроцессоров.
