import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Region {
    name: string[];
    cities: string[][];
  }

const NewAdminPage = () => {
    const navigate = useNavigate()

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [fax, setFax] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')
  const [city, setCity] = useState('')
  const [cityError, setCityError] = useState('')
  const [index, setIndex] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [matchingPassword, setMatchingPassword] = useState('')
  const [matchingPasswordError, setMatchingPasswordError] = useState('')
  const [newsletter, setNewsletter] = useState(false)

  const [formValid, setFormValid] =  useState(false)

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
      
  async function handle() {
        const request_data = {
          "firstName": firstName,
          "lastName": lastName,
          "username": username,
          "email": email,
          "phone": phone,
          "fax": fax,
          "company": company,
          "country": selectedRegion,
          "region": selectedCity,
          "city": city,
          "address": address,
          "index": index,
          "password": password,
          "newsletter": newsletter
        }

        alert(localStorage.getItem('Token'))

        const res = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/admin/new/user-admin', {
          method: "POST",
          body: JSON.stringify(request_data),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('Token')
          }
        })

        if (res.ok) {
          alert('Вы создали нового админа')
          const json = await res.text()
          console.log(json)
          localStorage.setItem('Token', json)
        } else {
          alert('Произошла неизвестная ошибка')
          navigate('/registration')
        }
  }

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity(null);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handlerFirstName = (e: any) => {
    setFirstName(e.target.value)
    const regex = /^[a-zA-Zа-яА-Я]+$/
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setFirstNameError('Не корректное имя')
    } else {
      if (!e.target.value) {
        setFirstNameError('Имя не должно быть пустым')
      }
      setFirstNameError('')
    }
  }
  
  const handleLastName = (e: any) => {
    setLastName(e.target.value);
    const regex = /^[a-zA-Zа-яА-Я]+$/
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setLastNameError('Не корректное фамилия')
    } else {
      if (!e.target.value) {
        setLastNameError('Фамилия не должна быть пустым')
      } else {
        setLastNameError('')
      }
    }
  };
  
  const handleUsername = (e: any) => {
    setUsername(e.target.value) 
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/
        if (e.target.value.length < 5) {
            setUsernameError('Логин не должен быть меньше 5 символов')
        } else {
            if (!usernameRegex.test(String(e.target.value).toLowerCase())) {
                setUsernameError('Не корректный логин')
            } else {
              if (!e.target.value) {
                setUsernameError('Логин не должен быть пустым')
              } else {
                setUsernameError('')
              }
            }
        }
  };
  
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    const regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setEmailError('Не корректный email')
    } else {
      if (!e.target.value) {
        setEmailError('Email не должен быть пустым')
      } else {
      setEmailError('')
      }
    }
  };
  
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
    const regex = /^\+?\d{10,15}$/;
    if(!regex.test(String(e.target.value))) {
      setPhoneError('Не корректный номер')
    } else {
      if (!e.target.value) {
        setPhoneError('Телефон не должен быть пустым')
      } else {
      setPhoneError('')
      }
    }
  };
  
  const handleFax = (e: any) => {
    setFax(e.target.value);
  };
  
  const handleCompany = (e: any) => {
    setCompany(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
    const regex = /^[a-zA-Zа-яА-Я]+$/
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setCityError('Не корректный город')
    } else {
      if (!e.target.value) {
        setCityError('Город не должен быть пустым')
      } else {
        setCityError('')
      }
    }
  };
  
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
    if (!e.target.value) {
      setAddressError('Адрес не должен быть пустым')
    } else {
      setAddressError('')
    }
  };
  
  const handleIndex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIndex(e.target.value);
  };
  
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if(8 > e.target.value.length) {
      setPasswordError('Пароль не должен быть меньше 8 символов')
      if (!e.target.value) {
          setPasswordError('Пароль не должен быть пустым')
      } 
    } else {
      setPasswordError('')
      }
  };
  
  const handleMatchingPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMatchingPassword(e.target.value);
    if (password !== e.target.value) {
      setMatchingPasswordError('Пароли не совпадают')
    } else {
        if (!e.target.value) {
          setMatchingPasswordError('Подтверждение пароля не должно быть пустым')
        }
      setMatchingPasswordError('')
    }
  };
  
  useEffect(() => {
    document.title = 'Новый админ'
    if (firstNameError || lastNameError || usernameError
      || emailError || phoneError || addressError
      || cityError || passwordError || matchingPasswordError) {
        setFormValid(false)
      } else {
        setFormValid(true)
      }
  }, [firstNameError, lastNameError, usernameError,
    emailError, phoneError, addressError,
    cityError, passwordError, matchingPasswordError])

  return (
    <div>
      <form>
        <h1>Регистрация</h1>
        {(firstNameError) && <div style={{color: 'red'}}>{firstNameError}</div>}
        <input onChange={e => handlerFirstName(e)} type="text" value={firstName}
        name='firstName' placeholder='Ваше имя*' style={{ borderColor: 'red' }} /> <br />
        {(lastNameError) && <div style={{color: 'red'}}>{lastNameError}</div>}
        <input onChange={e => handleLastName(e)} type="text" value={lastName} 
        name='lastName' placeholder='Ваша фамилия*' style={{ borderColor: 'red' }} /> <br />
        {(usernameError) && <div style={{color: 'red'}}>{usernameError}</div>}
        <input onChange={e => handleUsername(e)} type="text" value={username} 
        name='username' placeholder='Ваш логин*' style={{ borderColor: 'red' }} /> <br />
        {(emailError) && <div style={{color: 'red'}}>{emailError}</div>}
        <input onChange={e => handleEmail(e)} type="text" value={email} 
        name='email' placeholder='Ваш email*' style={{ borderColor: 'red' }} /> <br />
        {(phoneError) && <div style={{color: 'red'}}>{phoneError}</div>}
        <input onChange={e => handlePhone(e)} type="text" value={phone} 
        name='phone' placeholder='Ваш номер*' style={{ borderColor: 'red' }} /> <br />
        <input onChange={e => handleFax(e)} type="text" value={fax} 
        name='fax' placeholder='Ваш факс*' /> <br />
        <input onChange={e => handleCompany(e)} type="text" value={company} 
        name='company' placeholder='Ваша компания*' /> <br />
        <label>
          <select value={selectedRegion || ''} onChange={handleRegionChange}>
            <option value="">Выберите страну</option>
            {regions.map(region => (
              <option key={region.name[0]} value={region.name[0]}>{region.name[1]}</option>
            ))}
          </select>
        </label> <br />
        <label>
          <select value={selectedCity || ''} onChange={handleCityChange} disabled={!selectedRegion}>
            <option value="">Выберите область/регион  </option>
            {regions.find(region => region.name[0] === selectedRegion)?.cities.map(city => (
              <option key={city[0]} value={city[0]}>{city[1]}</option>
            ))}
          </select>
        </label> <br />
        {(cityError) && <div style={{color: 'red'}}>{cityError}</div>}
        <input onChange={e => handleCity(e)} type="text" value={city}
        name='city' placeholder='Ваш город*' style={{ borderColor: 'red' }} /> <br />
        {(addressError) && <div style={{color: 'red'}}>{addressError}</div>}
        <input onChange={e => handleAddress(e)} type="text" value={address}
        name='address' placeholder='Ваш адрес*' style={{ borderColor: 'red' }} /> <br />
        <input onChange={e => handleIndex(e)} type="text" value={index}
        name='index' placeholder='Ваш индекс*' /> <br />
        {(passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
        <input onChange={e => handlePassword(e)} type="password" value={password}
        name='password' placeholder='Ваш пароль*' style={{ borderColor: 'red' }} /> <br />
        {(matchingPasswordError) && <div style={{color: 'red'}}>{matchingPasswordError}</div>}
        <input onChange={e => handleMatchingPassword(e)} type="password" value={matchingPassword}
        name='matchingPassword' placeholder='Подтверждение пароля*' style={{ borderColor: 'red' }} /> <br />
        Рассылка: <input checked={newsletter} onChange={e => setNewsletter(e.target.checked)}  type="checkbox" name='newsletter'/> <br />
        <button disabled={!formValid} onClick={e => {e.preventDefault(); handle() }} type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default NewAdminPage