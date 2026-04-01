# Redux Toolkit (RTK) Bələdçisi və Layihənizdə İstifadəs

Bu sənəd layihənizdə qurduğumuz **Redux Toolkit** arxitekturasını və onun necə işlədiyini tam başa düşməyiniz üçün hazırlanıb.

## Redux Nədir və Niyə İstifadə Edirik?

React proqramlarında tətbiqin *"state"* (vəziyyət) dataları adətən komponentlər daxilində (məsələn, `useState` ilə) saxlanılır. Amma layihə böyüdükcə bu dataları fərqli səhifələrə (məsələn Register, Login, Header) daşımaq çətinləşir.
**Redux** bütün tətbiqin ortaq datalarını saxlayan **Mərkəzi Anbar** (Store) yaradır. İstənilən komponent o anbara qoşulub məlumatı ala və ya dəyişdirə bilər.

---

## Layihənizdəki Redux Arxitekturası

Biz layihədə **2 əsas hissə** qurduq:
1. **Store** ([store.js](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/store/store.js)) - Bütün dataların toplandığı mərkəz.
2. **Slice** ([authSlice.js](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/features/authSlice.js)) - Mərkəzin xüsusi bir bölməsi (məsələn, "auth" yəni qeydiyyat/login məlumatları daxil olan bölmə).

### 1. Store ([src/redux/store/store.js](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/store/store.js))

Burada anbarımızı yaradırıq. `configureStore` vasitəsilə fərqli "slice"-ları anbara tanıdırıq.
```javascript
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    authReducer: authReducer // authSlice-dan gələn dataları burada saxlayırıq
  },
})
```
*Tətbiqdə hər hansı başqa data lazım olsa (məsələn, məhsullar, istifadəçilər), onlar üçün də xüsusi slice yaradıb bu `reducer` obyektinin içinə əlavə edəcəyik.*

### 2. Slice və Thunk ([src/redux/features/authSlice.js](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/features/authSlice.js))

#### İlk Vəziyyət (Initial State)
Slice-in formalaşması bura ilə başlayır. Komponentlərdəki `useState` kimidir. Başlanğıc dataları təyin edirik:
```javascript
const initialState = {
  user: null,         // Daxil olmuş istifadəçi və ya qeydiyyatdan keçən istifadəçi
  isLoading: false,   // API-ə sorğu gedib-getmədiyini göstərən loading vəziyyəti
  error: null,        // Əgər API-dən xəta gəlsə, səbəbini burada saxlayırıq
};
```

#### Asinxron Əməliyyatlar (`createAsyncThunk`)
Backend ilə danışmaq API sorğuları gecikmə ilə işləyir. Redux-da asinxron əməliyyatları idarə etmək üçün `createAsyncThunk` qeyri-sinxron bir Action yaradır:
```javascript
export const registerUser = createAsyncThunk(
  'auth/registerUser', // Action-un adı
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      return response.data; // Uğurlu olsa bu data fulfilled vəziyyətinə göndərilir
    } catch (error) {
      // Xəta olsa bu messaj rejected vəziyyətinə göndərilir
      return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi');
    }
  }
);
```

#### Slice-in Özü (`createSlice`)
Bura isə həm `state`-i, həm də onu dəyişəcək funksiyaları təyin etdiyimiz yerdir.
- **reducers**: Adi, sinxron funksiyalar (məsələn, xətanı sildirmək üçün [clearError](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/features/authSlice.js#26-29)).
- **extraReducers**: `createAsyncThunk` kimi kənardan gələn asinxron aksiyaların 3 fərqli mərhələsini idarə etmək üçündür.

[extraReducers](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/features/authSlice.js#30-45) belə işləyir:
1. `pending`: Sorğu yenicə göndərildi. (`isLoading = true` edirik ki, "Yüklənir" yazaq).
2. `fulfilled`: Sorğu uğurla başa çatdı. (`isLoading = false` edirik, `user`-ə datanı mənimsədirik).
3. `rejected`: Sorğuda xəta oldu. (`isLoading = false` edirik, `error` həmən xətanı özündə saxlayır).

---

## React Komponentlərində Redux Necə İstifadə Olunur?

React komponentlərinin bu Mərkəzi Anbarla əlaqəsini təşkil etmək üçün **2 əsas Hook** var:

### 1. `useSelector` (Məlumatı almaq)
Redux anbarı (`store`) içində olan datanı götürmək üçündür.

```javascript
import { useSelector } from 'react-redux';

const Register = () => {
    // anbardaki 'authReducer' bölməsindən loading və error vəziyyətlərini çəkirik:
    const { isLoading, error } = useSelector((state) => state.authReducer);
    
    // ...
}
```

### 2. `useDispatch` (Əmr vermək / Funksiyanı başlatmaq)
Redux anbarındakı actionları (məsələn API sorğusu göndərən funksiyanızı) başlatmaq üçündür. Redux ancaq dispatch ilə işə düşə bilər.

```javascript
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/features/authSlice';

const Register = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        // Form göndəriləndə action-u dispatch edirik:
        await dispatch(registerUser({ username, email, password }));
    };
    
    // ...
}
```

---

## İcra Olunma Axını (Flow) - Nümunə: Qeydiyyat
1. İstifadəçi Formu doldurub [Register](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/pages/auth/register/Register.jsx#5-69) düyməsinə basır.
2. [Register.jsx](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/pages/auth/register/Register.jsx) içində `dispatch(registerUser(...))` çalışır.
3. [authSlice.js](file:///c:/Users/hp/Desktop/Quiz/Quiz-Front/src/redux/features/authSlice.js) xəbər tutur:
   - Öncə **pending** işə düşür -> Ekranda "Yüklənir..." yazılır.
   - Sonra Backend-ə `axios.post` gedir.
4. Nəticədən asılı olaraq:
   - **Backend uğurlu olsa**: `fulfilled` işə düşür -> Loading dayanır və İstifadəçi anbara əlavə olunur. Ekranda uüurlu `alert` çıxır.
   - **Backend xəta versə**: `rejected` işə düşür -> Loading dayanır və `.catch` vasitəsilə error anbara düşür. Ekranda "Email artıq istifadə olunub" və s. yazır.

Hər başqa API prosesi üçün (Login, Logout, Refresh) eyni arxitektura istifadə olunacaq!
