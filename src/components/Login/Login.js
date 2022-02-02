import React, { useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => { //Бул жакта 5 useState бар
  const [enteredEmail, setEnteredEmail] = useState('');//Это отвечает за email 
  const [emailIsValid, setEmailIsValid] = useState(false);//Это отвечает за проверку email 
  const [enteredPassword, setEnteredPassword] = useState('');//Это отвечает за пароль
  const [passwordIsValid, setPasswordIsValid] = useState(false);//Это отвечает за проверку пороль
  const [formIsValid, setFormIsValid] = useState(false); //Это отвечает за форма пустой болуп калса false болуп тура бериш керек форма толтурулган болсо true болот

  const emailChangeHandler = (event) => { //Это emailChangeHandler булар input тун ичинде OnChange={} менен чакырылат 
    setEnteredEmail(event.target.value); //Бул жерде ошолордун value син алып туруп enteredEmail дын ичине сактап жатабыз

    setFormIsValid( //Мы вызываем здесь setFormIsValid
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );//event.target.value email дын знычениясын алып жатабыз анан includes('@') включает ли он собачку @ эсли выключает анда true болуп калат а патом оператор && жана проверка enteredPassword.trim().length > 6 жазган паролубуз 6 дан жогору болсо парол туура жасылган деген логика бул жерде
  };

  const passwordChangeHandler = (event) => { //Это passwordChangeHandler тоже самое passwordChangeHandler менен иштетекенде setFormIsValid сакырылса 
    setEnteredPassword(event.target.value); 

    setFormIsValid( 
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );//Бул жеред биринчи ошол парольду текшерет паролду жаздык туура эле бул жер true болот && жана деп биз ошол email ды текшерип койобуз email ды жазканбыз true болсо бул жер общий true кайтарат патом useState(true)деп сактап койот
  };

  const validateEmailHandler = () => { //Бул функция кторый вот кайра ле ошол setEmailIsValid ди чакырып жатат 
    setEmailIsValid(enteredEmail.includes('@')); //Если собачкасы бар болсо значить email valid true калйтарып койот проста 
  };

  const validatePasswordHandler = () => { // Бул функция болсо 
    setPasswordIsValid(enteredPassword.trim().length > 6); //Пароль ду trim() кылып lebgth ны проверка кылып 6 > дан  жогору болсо бул деле true кайтарып койот
  };

  const submitHandler = (event) => { //Бул жерде ошол жана setFormIsValid useState(true) эмнеге сактап койот десек бул жерде submit кылгында
    event.preventDefault(); //Мы потом можем проверить форма толтурулдубу же толтурулбадыбы
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : '' //Бул жерде div ке className бергенбиз classes.control алып жатат жана emailIsValid биздн false болуп калса анда classes.invalid ди берип кой деп жатабыз 
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}//OnBlur метод емес event бул true и false алат смотря true,false то есть М: input тун ичи пустой бирок четтери кызыл болуп турат как будто ошибка ичине бирдеке жазсак ал жоголуп кетет это onBlur бул жоголбойт пока биз туура жазмайынча 
          />
        </div>
        <div
          className={`${classes.control} ${ //Бул жерде div ке className бергенбиз classes.control алып жатат жана passwordIsValid биздн false болуп калса анда classes.invalid ди берип кой деп жатабыз 
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}//OnBlur метод емес event бул true и false алат смотря true,false то есть М: input тун ичи пустой бирок четтери кызыл болуп турат как будто ошибка ичине бирдеке жазсак ал жоголуп кетет это onBlur бул жоголбойт пока биз туура жазмайынча 
          />
        </div>
        <div className={classes.actions}>
          {/*  бул жакта кнопкабызда да disabled деген функциясы бар он будеть true в том случе если formIsValid польностю true болгондо */}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login 
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;


//Паобочные еффекты ето всё что происходитьт кроме етих вещей М: HTTP жонотууб хранить что-то в хранилще бразера.LocalStroge , settmeout, setinterval это всё SideEffect
