# Quiz App - Frontend

Bu layihə, interaktiv test (quiz) sisteminin istifadəçi interfeysini (frontend) təşkil edir. React və Vite istifadə edilərək hazırlanıb və müasir UI/UX standartlarına cavab verən tam funksional dizayna malikdir.

## 🚀 Texnologiyalar

Layihədə aşağıdakı əsas texnologiyalar və kitabxanalar istifadə olunub:

- **React 19** - UI komponentlərinin inşası üçün
- **Vite 8** - Sürətli inkişaf mühiti (dev server) və build aləti kimi
- **React Router Dom (v7)** - Səhifələrarası keçid və yönləndirmə üçün
- **Redux Toolkit & React Redux** - Tətbiqin state idarəetməsi üçün
- **Tailwind CSS (v4)** - Sürətli və effektiv stilizasiya üçün
- **Ant Design & Material UI** - UI komponentləri üçün
- **Lucide React** - Müasir və təmiz ikonlar üçün
- **Axios** - HTTP sorğularının idarə edilməsi (API ilə əlaqə) üçün
- **Yup** - Formaların validasiyası üçün
- **Shadcn** & **Radix UI** - Özəlləşdirilə bilən komponent bazası

## 📦 Qurulum və İşəsalma

Layihəni öz maşınınızda işlətmək üçün aşağıdakı addımları izləyin:

### 1. Repozitoriyanı klonlayın
```bash
git clone https://github.com/arzummammadova/Quiz.git
cd Quiz-Front
```

### 2. Asılılıqları yükləyin (Dependencies)
NPM istifadə edərək lazımi paketləri yükləyin:
```bash
npm install
```

### 3. Ətraf mühit dəyişənlərini (Environment Variables) qurun
Layihənin kök dizinində `.env` faylı yaradın və API ünvanınızı qeyd edin (nümunə formatı varsa faylda mövcuddur).

### 4. Layihəni işə salın
Development serverini başlatmaq üçün:
```bash
npm run dev
```

Layihə standart olaraq `http://localhost:5173` ünvanında işləyəcəkdir.

## 🛠 Skriptlər

- `npm run dev`: Development serverini başladır.
- `npm run build`: Tətbiqin production versiyasını hazırlayır (`dist` qovluğuna).
- `npm run preview`: Build edilmiş tətbiqi test məqsədilə local serverdə başladır.
- `npm run lint`: Kodun keyfiyyətini yoxlayır və xətaları tapır.

## 📂 Layihə Strukturunun İcmalı

- `src/` - Əsas tətbiq kodları
  - `pages/` - Səhifə komponentləri (Auth, QuizPage və s.)
  - `helpers/` - Köməkçi funksiyalar (Authentication və s.)
  - `components/` - Yenidən istifadə edilə bilən React komponentləri
- `public/` - Statik fayllar

## 🤝 Töhfə vermək (Contributing)

Layihəyə töhfə vermək istəyirsinizsə, lütfən bir "Pull Request" yaradın. Yeni xüsusiyyət əlavə etmədən öncə `main` branch-dən ən son kodları çəkdiyinizdən (pull) əmin olun.
