# LucyCover 2.0 - Techniczny projekt nowatorski
## O projekcie
Projekt powstał na zlecenie loklanych przychodni położniczych zajmujących sie wykonywaniem wizyt środowiskowych po urodzniu. Głównym celem aplikacji jest usprawnienie procesu zarządzania pacjentami oraz dokumnetacją wytwarzaną po wizytach. Aplikacja ta jest specjalnie zaprojketowanym narzędziem pracy wspierającym pracowników w przychodni podczas wszystkich etapów ich pracy

## Założenia aplikacji
1. System zapewnia odseparowany dostęp wszystkim pracowniką przychodni poprzez prowadzenie kont użytkowników
2. Pracownicy maja możliwość samodzielnego zakładania konta pacjenta, które przechowuja informacje do tej pory przetrzymywane w loklanej karcie pacjenta (dokumentacja medyczna, zalecenia po wizycie, historia wizyt)
3. System wspiera pracowników przychodni podczas planowania dania pracy poprzez zaimplmenentowany kalendarz. Kalendarz umożliwia planowanie wizyt na konkretne dni oraz godziny. Jednocześnie podczas planowania wizyty automatycznie informuje pacjenta drogą mailową.
4. System umożliwa bezpieczne zarządzanie dokumentacja.
5. Aplikacja umozliwia generowanie zaleceń dla pacjentów po wizycie oraz przygotowanie dokumentu do szybkiego wydruku.
6. Zapewniony zostął również serwer plików, kóry umożliwia użytkowniką przechowywanie zgromadzonych materiałów edukacyjnych oraz łatwe udostępnianie ich pacjentą za pośrednictwem poczty elektronicznej
7. Aplikacja pozwala prowadzić i analizowac korespondencje mailową pomiędzy pacjentem a użytkownikiem z poziomu systemu.

## Wykorzystane technologie
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white) ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Client-side
* JavaScript
* React
* React Router
* Framer motion
* React Redux
* Vite
* TanStack Query
### Server-side
* EntityFramework
* ASP .NET Core
* JWT BEARER
* Swashbuckle/swwagger
* FluentValidtor
* MailKit
* AutoMapper

## Wymagane zależności do uruchomienia 
1. Node.js - wersja min. 12.0.0 -> [LINK](https://nodejs.org/en)
2. .NET SDK 7.0. -> [LINK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
3. MS SQL server  -> [LINK](https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x415&culture=pl-pl&country=pl)

## Instalacja
1) Pobierz kooie repozytorium na lokalną stację
    ~~~~
    git clone https://github.com/jczarnecki014/LucyCover-Techniczny-projekt-nowatorski.git
    ~~~~
#### Instalacja aplikacji klienckiej
1) Przejdź do katalogu `./LucyCover - Frontend` i zainstaluj wymagane zależności.
    ```
    cd ./LucyCover - Frontend
    npm install
    ```
2) Uruchom aplikację kliencką komendą:
    ```
    npm run dev
    ```
3) Jako wynik otrzmasz lokalny adres do połączenia się z aplikacją:
    ```
    Vite v4.0.0  ready in 300ms
    
      Local:   http://localhost:1578/
      Network: use --host to expose
    
      VITE v4.0.0  ready in 300ms
      App running at:
      - Local:   http://localhost:3000/
      - Network: http://192.168.1.10:3000/
    
    ```
    Wykorzystaj adres "Local" jako adres połączeniowy. Aby połączyć się z aplikacją wystarczy, że w oknie przeglądarki wpiszesz ten adres.

#### Konfiguracja MS SQL
Aby uruchomić aplikację serwerową (backend) w pierwszej kolejności należy skonfigurować lokalny serwer bazodanowy. Jest on niezbędny do prawidłowego uruchomienia aplikacji.

1) Pobierz i zainstaluj aplikacje MS SQL Serwer Express z linku podanego w zakładce "Wymagane zależności do uruchomienia". 
2) Gdy zakończy się instalacja MS SQL Serwer instalator wyświetli nazwę utworzonego serwera. W większości przypadków jest to `localhost\SQLEXPRESS`
3) Gdy zainstalujesz MS SQL Serwer musisz przygotowac bazę danych, która będzie wykorzystywana przez LucyCover. W tym celu uruchom terminal CMD lub PowerShell i nawiąż połączenie z serwerem komendą:
    ``` 
    c:/>
    sqlcmd -S localhost\SQLEXPRESS -E
    ```
4) Po zalogowaniu się do SQL Server, możesz wykonać zapytanie SQL, aby utworzyć bazę danych:
    ```
    1> CREATE DATABASE LucyCover;
    2> GO
    ```
5) Jeżeli wykonałeś wszystkie operacje zgodnie z instrukcją powinieneś mieć wstępnie utworzoną bazę danych gotową do pracy.

#### Instalacja aplikacji serwerowej (backend)
1) Aby uruchomić aplikacje serwerową koniecznym jest wcześniejsze skonfigurowanie MS SQL. Jeżeli jeszcze tego nie zrobiłeś zacznij od tego kroku.
2) Przed uruchomieniem aplikacji należy w pierwszej kolejności dokonać konfiguracji aplikacji. Aby to wykonać należy uruchomić plik konfiguracyjny `LucyCover - Backend/appsettings.json`
3) Poniżej przedstawiono wstępną konfiguracje pliku:
    W tym miejscu ustaw adres twojej aplikacj klienckiej zwracanej przez vite. Służy ona to prawidłowej konfiguracji polityki `CORSE`
    ```
    "AllowedOrigin": "https://localhost:5173/"
    ```
    W tym miejscu masz możliwośc konfiguracji trybu w jakim pracuje aplikacja. Dostępne są:
    - simulation - Tryb symulacji służący do prezentacji aplikacji. Aplikacja domyślnie wygeneruje dla ciebie testowego użytkownika, 20 przypisanych pacjentów z losowo wygenerowanymi dokumentacjami oraz wizytami. `Zalecam stosowanie tego trybu w sytuacji, gdy uruchamiasz aplikację do celów testowania lub prezenetowania np. jeżeli sprawdzasz pracę jako promotor`
    - default - domyślny tryb pracy aplikacji. Aplikacja nie zawiera, żadnych domyślnych danych i jest gotowa do uruchomienia do celów produkcyjnych
    ```
    "Mode": "simulation"
    ```
    W tym miejscu skonfigurujesz zasady połączenia dla twojej bazy danych. Domyślnie ustawiono podstawową konfigurację dla MS SQl Express. Jeżeli twój serwer nazywa sie `localhost\SQLEXPRESS` a baza danych `LucyCover` możesz pozostawić tą konfigurację bez zmian. W przeciwnym razie musisz prawidłowo skonfigurowac connection string.
    ```
    "ConnectionStrings": {
        "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=LucyCover;Trusted_Connection=True;TrustServerCertificate=True"
      },
    ```
    Pozostałe konfiguracje dotyczą poczty elektronicznej czy mechanizmów autentykacji. Nie powinieneś ich edytować.
    
4) Jeżeli przeprowadziłeś prawidłową konfigurację pliku appsetings.json możesz uruchomić aplikację wykonując polecenie w terminalu w katalogu ./LucyCover - Backend:
    ```
    dotnet run --launch-profile "https"
    ```
    
Jeżeli aplikacja urchomiła się prawidłowo, możesz teraz zacząć korzystać z aplikacji klienckiej. Połączenia między aplikacjami będą wykonywały się automatycznie.

## Informacja dodatkowa
`Uwaga ! Jeżeli testujesz aplikacje uruchamiaj ją w trybie symulacji`

    appsetting.json
    ```
    "Mode": "simulation"
    ```
W trybie symulacji aplikacja udostępnia do testów specjalnego użytkownika z wstępnie wygenerowanymi danymi. 
Dane logowania:
```
email: testuser@lucycover.com
hasło: test
```
    
