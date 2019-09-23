export  const checkErrors = (e, arg, customer, setError, onChange, setSubmit, submit, error ) => {
    console.log(e.target.value, [arg][0], [arg], error);
    if (e.target.value === "") {
        setError({...error, [arg]: "Please, fill in the field"});
        e.target.classList.add("notSubmit");
        onChange({...customer, [arg]: e.target.value});
     } else if ([arg][0] === 'firstName' &&
            /^[A-Za-zа-яА-ЯёЁ']+$/.test(
                e.target.value
            ) === false
        ) {
            setError({...error,[arg]: `${[arg]} must not include numbers or symbols`});
            e.target.classList.add("notSubmit");
            onChange({...customer, [arg]: e.target.value});

    } else if ([arg][0] === 'makeCar' &&
        /^[A-Za-zа-яА-ЯёЁ']+$/.test(
            e.target.value
        ) === false
    ) {
        setError({...error,[arg]: `${[arg]} must not include numbers or symbols`});
        e.target.classList.add("notSubmit");
        onChange({...customer, [arg]: e.target.value});

    } else if ([arg][0] === 'modelCar' &&
    /^[A-Za-zа-яА-ЯёЁ']+$/.test(
        e.target.value
    ) === false
) {
    setError({...error,[arg]: `${[arg]} must not include numbers or symbols`});
    e.target.classList.add("notSubmit");
    onChange({...customer, [arg]: e.target.value});

} else if ([arg][0] === 'yearCar' &&
    /^[0-9{4}']+$/.test(
        e.target.value
    ) === false
) {
    setError({...error,[arg]: `${[arg]} must not include numbers or symbols`});
    e.target.classList.add("notSubmit");
    onChange({...customer, [arg]: e.target.value});

} else if ([arg][0] === 'vinCar' &&
        /^[0-9{15}']+$/.test(
            e.target.value
        ) === false
    ) {
        setError({...error,[arg]: `${[arg]} must not include numbers or symbols`});
        e.target.classList.add("notSubmit");
        onChange({...customer, [arg]: e.target.value});

    }

    else if ([arg][0] === 'lastName' &&
        /^[A-Za-zа-яА-ЯёЁ']+$/.test(
            e.target.value
        ) === false
    ) {
        setError({...error,[arg]: `${[arg]} must not include numbers or symbols`});
        e.target.classList.add("notSubmit");
        onChange({...customer, [arg]: e.target.value});

    }
    else if ([arg][0] === "email" &&
        /^[A-Za-z0-9а-яА-ЯёЁ']+\W?[A-Za-z0-9а-яА-ЯёЁ']+@[a-zA-Z]+\.[a-z]{2,3}$/.test(
            e.target.value
        ) === false
        ) {
            setError({...error,[arg]: "Email must contain @ and .com/.ru or etc."});
            e.target.classList.add("notSubmit");
            onChange({...customer, [arg]: e.target.value});

    }  else if ([arg][0] === "dateOfBirth" &&
        /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(
            e.target.value
        ) === false
    ) {
        setError({...error,[arg]: "Please, fill correct date"});
        e.target.classList.add("notSubmit");
        onChange({...customer, [arg]: e.target.value});

    } else if ([arg][0] === "phone" &&
        /^\+[0-9]{3}\([0-9]{2}\) |[0-9]{3}-[0-9]{2}-[0-9]{2}\b/.test(
            e.target.value
        ) === false
    ) {
        setError({...error,[arg]: "Please, fill phone number in correct format"});
        e.target.classList.add("notSubmit");
        onChange({...customer, [arg]: e.target.value});

    } else if ([arg][0] === "password" &&
        /^[A-Za-z0-9а-яА-ЯёЁ'.-_]{6,10}$/.test(e.target.value) === false
    ) {
        setError({
            ...error,
            password: "Пароль должен быть от 6 до 10 символов"
        });
        e.target.classList.add("notSubmit");
        onChange({ ...customer, password: e.target.value });
    }
    else if ([arg][0] === "password2" &&
        /^[A-Za-z0-9а-яА-ЯёЁ'.-_]{6,10}$/.test(e.target.value) === false
    ) {
        setError({
            ...error,
            password2: "Пароль должен быть от 6 до 10 символов"
        });
        e.target.classList.add("notSubmit");
        onChange({ ...customer, password2: e.target.value });
    }

    else {
        setError({...error, [arg]: ""});
        e.target.classList.remove("notSubmit");
        setSubmit({...submit, [arg]: true});
        onChange({...customer, [arg]: e.target.value});
    }
};