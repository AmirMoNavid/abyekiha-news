import Head from "next/head";

const MainHead = ({
    title = '',
    description = 'مشاوره حقوقی پیام حق به صورت تلفنی همه روزه حتی ایام تعطیل در کلیه امور کیفری ، حقوقی ، خانواده از قبیل طلاق ، مهریه ، نفقه و غیره در خدمت شما عزیزان می باشد.',
    robots = null
}) => {
    title = ' پیام حق | ' + title;

    return (
        <Head>
            <title>{title}</title>
            {robots && <meta name="robots" content={robots} />}
            {description && <meta name="description" content={description} />}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-37QPV6YFS2"></script>
            <meta name="author" content="وکیل سمانه راه بین" />
            <meta name="keywords" content="طلاق ,مهریه و نفقه ,حضانت فرزند, حکم رشد, فسخ نکاح, چک و سفته, مشاوره ملکی, الزام به تنظیم سند, کلاهبرداری, تهدید, فروش مال غیر, مشاوره بیمه, مشاوره پزشکی, مشاوره ثبتی," />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:image" content="<your page cover>" />
            <meta property="og:url" content="<your url>" />
            <meta property="og:site_name" content="codedamn" />
            <link rel="icon" href="/logo.png" />
            <meta
                name="format-detection"
                content="telephone=no, date=no, email=no, address=no"
            />
        </Head>
    )
};

export default MainHead;