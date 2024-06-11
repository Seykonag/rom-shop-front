import React, { useEffect, useState } from 'react';
import { useUser } from '../usercontext';
import './profile.css';
import { useNavigate } from 'react-router-dom';

interface Region {
    name: string[];
    cities: string[][];
  }

  

const ProfilePage = () => {
    const navigate = useNavigate();

    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const [newSelectedRegion, setNewSelectedRegion] = useState<string | null>(null);
    const [newSelectedCity, setNewSelectedCity] = useState<string | null>(null);

    const { username } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [fax, setFax] = useState('');
    const [phone, setPhone] = useState('');
    const [index, setIndex] = useState('');

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newCompany, setNewCompany] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFax, setNewFax] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newIndex, setNewIndex] = useState('');

    const regions: Region[] = [
        {
          name: ['BELARUS', 'Беларусь'],
          cities: [
            ['BREST', 'Брест'],
            ['VITEBSK', 'Витебск'],
            ['GOMEL', 'Гомель'],
            ['GRODNO', 'Гродно'], 
            ['MINSK', 'Минск'], 
            ['MINSKIY', 'Минский'], 
            ['MOGILEV', 'Могилев']]
        },
            {
              name: ["GEORGIA", "Грузия"],
              cities: [
                ["ABKHAZIA", "Абхазия"],
                ["AJARIA", "Аджария"],
                ["GURIA", "Гурия"],
                ["IMERETI", "Имеретия"],
                ["KAKHETI", "Кахетия"],
                ["KVEMOKARTLI", "Квемокартли"],
                ["MTSKHETAMTIANETI", "Мцхета-Мтианети"],
                ["RACHALECHKUMIANDKVEMOSVANET", "Рача-Лечхуми-Квемо-Сванети"],
                ["SAMEGRELOZEMOSVANETI", "Самегрело-Земо-Сванети"],
                ["SAMSKHEJAVAKHETI", "Самцхе-Джавахети"],
                ["SHIDAKARTLI", "Шида-Картли"],
                ["TBILISI", "Тбилиси"]
              ]
            },
            {
              name: ["KAZAKHSTAN", "Казахстан"],
              cities: [
                ["AKMOLINSKIY", "Акмолинская"],
                ["AKTUBINSKIY", "Актюбинская"],
                ["ALMATINSKIY", "Алматинская"],
                ["ALMATY", "Алматы"],
                ["ASTANA", "Астана"],
                ["ATIRAYSKIY", "Атырауская"],
                ["BAIKONYR", "Байконур"],
                ["ORIENTALKAZAKHSTAN", "Восточно-Казахстанская"],
                ["JAMBYLSKIY", "Жамбылская"],
                ["WESTKAZAKHSTAN", "Западно-Казахстанская"],
                ["KARAGANDINSKIY", "Карагандинская"],
                ["KOSTANASKIY", "Костанайская"],
                ["KYZILORDINSKIY", "Кызылординская"],
                ["MANGISTAYSKIY", "Мангистауская"],
                ["PAVLODARSKIY", "Павлодарская"],
                ["NORTHKAZAKHSTAN", "Северо-Казахстанская"],
                ["SOUTHKAZAKHSTAN", "Южно-Казахстанская"]
              ]
            },
            {
              name: ["KYRGYZSTAN", "Киргизия"],
              cities: [
                ["BATKEN", "Баткен"],
                ["BISHKEK", "Бишкек"],
                ["CHU", "Чуй"],
                ["JALALABAD", "Джалалабад"],
                ["NARYN", "Нарын"],
                ["OSH", "Ош"],
                ["TALAS", "Талас"],
                ["YSYKKOL", "Ысык-Кол"]
              ]
            },
            {
              name: ["RUSSIA", "Россия"],
              cities: [
                ["BELGOROD", "Белгород"],
                ["BRYANSK", "Брянск"],
                ["VLADIMIR", "Владимир"],
                ["VOLGOGRAD", "Волгоград"],
                ["VOLOGDA", "Вологда"],
                ["VORONEZH", "Воронеж"],
                ["IVANOVO", "Иваново"],
                ["IRKUTSK", "Иркутск"],
                ["KALININGRAD", "Калининград"],
                ["KALUGA", "Калуга"],
                ["KEMEROVO", "Кемерово"],
                ["KURGAN", "Курган"],
                ["KURSK", "Курск"],
                ["LENINGRAD", "Ленинград"],
                ["LIPETSK", "Липецк"],
                ["MAGADAN", "Магадан"],
                ["MOSCOW", "Москва"],
                ["MURMANSK", "Мурманск"],
                ["NIZHNYNOVGOROD", "Нижний Новгород"],
                ["NOVGOROD", "Новгород"],
                ["NOVOSIBIRSK", "Новосибирск"],
                ["OMSK", "Омск"],
                ["ORENBURG", "Оренбург"],
                ["OREL", "Орел"],
                ["PENZA", "Пенза"],
                ["PSKOV", "Псков"],
                ["ROSTOV", "Ростов"],
                ["RYAZAN", "Рязань"],
                ["SAMARA", "Самара"],
                ["SARATOV", "Саратов"],
                ["SAKHALIN", "Сахалин"],
                ["SVERDLOVSK", "Свердловская"],
                ["SMOLYANINOVSKY", "Смоленск"],
                ["TAMBOV", "Тамбов"],
                ["TVER", "Тверь"],
                ["TOMSK", "Томск"],
                ["TULA", "Тула"],
                ["TYUMEN", "Тюменская"],
                ["ULYANOVSK", "Ульяновск"],
                ["CHELYABINSK", "Челябинская"],
                ["CHECHNYA", "Чечня"],
                ["CHUVASHIA", "Чувашия"],
                ["CHUKOTKA", "Чукотка"],
                ["YAMALNENETS", "Ямало-Ненецкий"],
                ["YAROSLAVL", "Ярославль"]
              ]
            },
            {
              name: ["UZBEKISTAN", "Узбекистан"],
              cities: [
                ["ANDIJON", "Андижан"],
                ["BUXORO", "Бухара"],
                ["FARGONA", "Фергана"],
                ["JIZZAX", "Джизак"],
                ["NAMANGAN", "Наманган"],
                ["NAVOIY", "Навоий"],
                ["QUASHDARIO", "Кашкадарья"],
                ["QORAQALPOGISTON", "Каракалпакстан"],
                ["SAMARQAND", "Самарканд"],
                ["SIRDARYO", "Сырдарья"],
                ["SURXONDARYO", "Сурхандарья"],
                ["TOSHKENT", "Ташкент"],
                ["TOSHENTSKIY", "Ташкентская"],
                ["XORAZM", "Хорезм"]
              ]
            },
            {
              name: ["UKRAINE", "Украина"],
              "cities": [
                ["VINNYTSIA", "Винницкая"],
                ["VOLYN", "Волынская"],
                ["DNIPROPETROVSK", "Днепропетровская"],
                ["DONETSK", "Донецкая"],
                ["ZHYTOMYR", "Житомирская"],
                ["ZAKARPATTIA", "Закарпатская"],
                ["ZAPORIZHIA", "Запорожская"],
                ["IVANOFRANKIVSK", "Ивано-Франковская"],
                ["KYIVCITY", "Киев"],
                ["KYIV", "Киевская"],
                ["KIROVOHRAD", "Кировоградская"],
                ["LUGANSK", "Луганская"],
                ["LVOV", "Львовская"],
                ["MYKOLAIV", "Николаевская"],
                ["ODESSA", "Одесская"],
                ["POLTAVA", "Полтавская"],
                ["RIVNE", "Ровенская"],
                ["SUMY", "Сумская"],
                ["TERNOPIL", "Тернопольская"],
                ["KHERSON", "Херсонская"],
                ["KHMELNYTSKY", "Хмельницкая"],
                ["CHERKASY", "Черкасская"],
                ["CHERNIVTSI", "Черновицкая"],
                ["CHERNIHIV", "Черниговская"]
              ]
            }
          ]

          const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
            const region = e.target.value;
            setNewSelectedRegion(region);
            setNewSelectedCity(null);
          };
        
          const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
            const city = e.target.value;
            setNewSelectedCity(city);
          };


          async function handleGet() {
            try {
                const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/profile', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });
        
                if (res.ok) {
                    const json = await res.json();
                    setFirstName(json.firstName);
                    setLastName(json.lastName);
                    setAddress(json.address);
                    setCity(json.city);
                    setCompany(json.company);
                    setEmail(json.email);
                    setFax(json.fax);
                    setPhone(json.phone);
                    setIndex(json.index);
                    setSelectedCity(json.region)
                    setSelectedRegion(json.country)

                    console.log(json); // Выводим объект JSON напрямую
                } else {
                    navigate('/login')
                }
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
                alert('Произошла ошибка при загрузке категорий');
            }
        };
        
        useEffect(() => {
            handleGet();
        }, []);

        async function handlePost() {
            const request_data = {
                "firstName": newFirstName !== '' ? newFirstName : null,
                "lastName": newLastName !== '' ? newLastName : null,
                "email": newEmail !== '' ? newEmail : null,
                "phone": newPhone !== '' ? newPhone : null,
                "fax": newFax !== '' ? newFax : null,
                "company": newCompany !== '' ? newCompany : null,
                "city": newCity !== '' ? newCity : null,
                "address": newAddress !== '' ? newAddress : null,
                "index": newIndex !== '' ? newIndex : null,
                "region": newSelectedRegion !== '' ? newSelectedCity : null,
                "country": newSelectedCity !== '' ? newSelectedCity : null
            };
            

            const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/profile', {
                    method: "POST",
                    body: JSON.stringify(request_data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });

                if (res.ok) {
                    alert('Данные обновлены')
                } else {
                    console.log(JSON.stringify(request_data))
                    alert('Данные были введены неверно')
                }    

                window.location.reload();
        }

    

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
    };


    function getRussianCountryName(englishName: string): string | undefined {
        const region = regions.find(region => region.name[0] === englishName);
        return region ? region.name[1] : undefined;
    }

    function getRussianCityName(cityEnglishName: string): string | undefined {
        for (const region of regions) {
          const city = region.cities.find(city => city[0] === cityEnglishName);
          if (city) {
            return city[1];
          }
        }
        return undefined;
    }

    function checker() {
        handlePost()
    }

    return (
        <div className="square">
            <p className="addtextlog">Ваш логин: {username}</p>
            <label className="label-name" htmlFor="name">Имя:</label>
            <input className="input-name" type="text" id="name" name="name" placeholder={firstName} value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />

            <label className="label-surname" htmlFor="surname">Фамилия:</label>
            <input className="input-surname" type="text" id="surname" name="surname" placeholder={lastName} value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />

            <label className="label-email" htmlFor="email">Email:</label>
            <input className="input-email" type="email" id="email" name="email" placeholder={email} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

            <label className="label-email" htmlFor="phone">Телефон:</label>
            <input className="input-email" type="text" id="phone" name="phone" placeholder={phone} value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />

            

            <label className="label-password" htmlFor="address">Адрес:</label>
            <input className="input-password" type="text" id="address" name="address" placeholder={address} value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />

            <label className="label-password" htmlFor="city">Город:</label>
            <input className="input-email" type="text" id="city" name="city" placeholder={city} value={newCity} onChange={(e) => setNewCity(e.target.value)} />
            <label className="label-password" htmlFor="city">Компания:</label>
            <input className="input-email" type="text" id="company" name="company" placeholder={company} value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
            <label className="label-password" htmlFor="city">Индекс:</label>
            <input className="input-email" type="text" id="index" name="index" placeholder={index} value={newIndex} onChange={(e) => setNewIndex(e.target.value)} />
            <label className="label-email" htmlFor="email">Факс:</label>
            <input className="input-email" type="text" id="fax" name="fax" placeholder={fax} value={newFax} onChange={(e) => setNewFax(e.target.value)} />


            <button className="btn-save" onClick={checker}>Изменить данные</button>
        </div>
    );
}

export default ProfilePage;
function setSelectedCity(arg0: null) {
    throw new Error('Function not implemented.');
}

