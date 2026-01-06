import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans pb-20">
            <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <div className="container mx-auto px-4 max-w-4xl flex items-center gap-4">
                    <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="font-bold text-xl text-slate-900">プライバシーポリシー</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-3xl mt-12 bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm text-slate-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-gray-200">個人情報保護方針</h2>

                <p className="mb-6">
                    株式会社AIMA（以下「当社」といいます。）は、当社の提供するサービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
                </p>

                <section className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">第1条（個人情報）</h3>
                    <p>
                        「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別情報）を指します。
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">第2条（個人情報の収集方法）</h3>
                    <p>
                        当社は、ユーザーがサービスを利用・お問い合わせをする際に氏名、会社名、電話番号、メールアドレスなどの個人情報をお尋ねすることがあります。
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">第3条（個人情報を収集・利用する目的）</h3>
                    <p className="mb-2">当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>本サービスの提供・運営のため</li>
                        <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                        <li>本サービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
                        <li>上記の利用目的に付随する目的</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">第4条（利用目的の変更）</h3>
                    <p>
                        当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">第5条（個人情報の第三者提供）</h3>
                    <p>
                        当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">第6条（お問い合わせ窓口）</h3>
                    <p>
                        本ポリシーに関するお問い合わせは、本サービスのお問い合わせフォームよりお願いいたします。
                    </p>
                </section>

                <div className="mt-12 text-center">
                    <Link to="/" className="text-blue-600 font-bold hover:underline">
                        トップページに戻る
                    </Link>
                </div>

            </div>
        </div>
    );
}
