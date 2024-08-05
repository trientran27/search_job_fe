import SvgIconStyle from "../components/SvgIconStyle";
import { enUS, viVN } from '@mui/material/locale';
import numeral from "numeral";
import { useTranslation } from "react-i18next";

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.png`} sx={{ width: 1, height: 1 }} />

const ICONS = {
    vn: getIcon('ic_flag_vn'),
    en: getIcon('ic_flag_us'),
}

console.log("vn ", ICONS.vn);

const LANGS = [
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
        icon: ICONS.en,
    },
    {
        label: 'Tiếng Việt',
        value: 'vi',
        systemValue: viVN,
        icon: ICONS.vn,
    }
];

export default function useLocales() {
    const { i18n, t: translate } = useTranslation();
    const langStorage = localStorage.getItem('i18nextLng');
    const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];
    numeral.locale(currentLang.value);

    const handleChangeLanguage = (newlang) => {
        i18n.changeLanguage(newlang);
    };

    return {
        onChangeLang: handleChangeLanguage,
        translate,
        currentLang,
        allLang: LANGS,
    };
}