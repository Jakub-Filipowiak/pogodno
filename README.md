# 🗺️ Pogodno Power Map

Interaktywna mapa osiedla Pogodno w Szczecinie, prezentująca najważniejsze "punkty mocy" – ulubione miejsca spotkań, lokalne zabytki, parki oraz najlepsze lodziarnie.

## ✨ Główne funkcje

*   **Interaktywna mapa:** W pełni funkcjonalna mapa oparta na OpenStreetMap (przy użyciu biblioteki Leaflet) z eleganckim, jasnym stylem (CARTO Voyager).
*   **Punkty Mocy:** Wyselekcjonowane lokalizacje z podziałem na kategorie (Lody, Zabytki, Miejsca spotkań, Natura).
*   **Płynne animacje:** Nowoczesny interfejs z animacjami przejść i interakcji dzięki bibliotece Framer Motion.
*   **Kod QR:** Wbudowany generator kodu QR pozwalający na szybkie otwarcie mapy na urządzeniu mobilnym podczas spaceru.
*   **Nawigacja:** Bezpośrednie linki prowadzące do nawigacji w Google Maps dla każdego z zaznaczonych punktów.

## 🛠️ Technologie

Projekt został zbudowany przy użyciu nowoczesnego stosu technologicznego:

*   [React 19](https://react.dev/) - Biblioteka interfejsu użytkownika
*   [Vite](https://vitejs.dev/) - Szybkie narzędzie budowania (Bundler)
*   [Tailwind CSS v4](https://tailwindcss.com/) - Stylowanie aplikacji
*   [React Leaflet](https://react-leaflet.js.org/) - Integracja map OpenStreetMap
*   [Framer Motion](https://www.framer.com/motion/) - Płynne animacje
*   [Lucide React](https://lucide.dev/) - Piękne, wektorowe ikony
*   [qrcode.react](https://github.com/zpao/qrcode.react) - Generowanie kodów QR

## 🚀 Uruchomienie lokalne

Aby uruchomić projekt na swoim komputerze, postępuj zgodnie z poniższymi krokami:

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/twoja-nazwa-uzytkownika/pogodno.git
   cd pogodno
   ```

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Uruchom serwer deweloperski:**
   ```bash
   npm run dev
   ```

4. Otwórz przeglądarkę i przejdź pod adres wskazany w konsoli (zazwyczaj `http://localhost:3000` lub `http://localhost:5173`).

## 📦 Budowanie wersji produkcyjnej

Aby zbudować zoptymalizowaną wersję aplikacji gotową do wdrożenia na serwer:

```bash
npm run build
```
Pliki wynikowe znajdą się w wygenerowanym folderze `dist/`.

## 🤝 Kontrybucje

Sugestie, zgłoszenia błędów i pull requesty są bardzo mile widziane! Jeśli znasz inne "punkty mocy" na Pogodnie, które powinny znaleźć się na mapie, śmiało otwórz nowe zgłoszenie (Issue) lub Pull Request.

## 📄 Licencja

Projekt udostępniany na licencji [MIT](https://choosealicense.com/licenses/mit/).
