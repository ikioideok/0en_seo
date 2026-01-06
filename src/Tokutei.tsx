import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Tokutei() {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans pb-20">
            <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <div className="container mx-auto px-4 max-w-4xl flex items-center gap-4">
                    <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="font-bold text-xl text-slate-900">特定商取引法に基づく表記</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-4xl mt-12">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 w-1/3 sm:w-1/4 border-r border-gray-100">
                                    事業者名
                                </th>
                                <td className="p-6 text-slate-900">
                                    株式会社AIMA
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    所在地
                                </th>
                                <td className="p-6 text-slate-900">
                                    大阪府大阪市北区梅田一丁目2番2号　大阪駅前第2ビル2階5-6号室
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    連絡先
                                </th>
                                <td className="p-6 text-slate-900 space-y-2">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <span>
                                            <span className="text-xs text-slate-500 block">メールアドレス</span>
                                            info@ai-and-marketing.jp
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-2">
                                        ※お電話での問い合わせは受け付けておりません。メールまたはフォームよりご連絡ください。<br />
                                        ※連絡先電話番号についても、ご請求いただければメールにて遅滞なく開示いたします。
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    販売価格<br className="sm:hidden" />（預り金）
                                </th>
                                <td className="p-6 text-slate-900">
                                    <div className="space-y-2">
                                        <p>お申し込みプランに応じた預り金をお支払いいただきます。</p>
                                        <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                                            <li>50万円（半年で12本制作）</li>
                                            <li>100万円（半年で24本制作）</li>
                                            <li>200万円（半年で48本制作）</li>
                                        </ul>
                                        <p className="text-xs text-slate-500 mt-2">※金額はすべて税別です。</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    商品代金以外の<br className="hidden sm:inline" />必要料金
                                </th>
                                <td className="p-6 text-slate-900">
                                    振込手数料（銀行振込の場合）
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    支払方法
                                </th>
                                <td className="p-6 text-slate-900">
                                    銀行振込（指定口座へのお振込み）
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    支払時期
                                </th>
                                <td className="p-6 text-slate-900">
                                    契約締結後、原則として7日以内（請求書に記載された期日まで）にお支払いください。<br />
                                    <span className="text-xs text-slate-500">※ご入金確認後の業務着手となります。</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    役務の提供時期
                                </th>
                                <td className="p-6 text-slate-900">
                                    ご入金確認後、最短3営業日以内にキックオフ（または初回ヒアリング）を実施し、業務を開始します。<br />
                                    契約期間は、原則として業務開始月から6ヶ月間となります。
                                </td>
                            </tr>
                            <tr>
                                <th className="bg-slate-50 p-6 font-bold text-slate-700 border-r border-gray-100">
                                    返金・キャンセル<br className="hidden sm:inline" />に関する特約
                                </th>
                                <td className="p-6 text-slate-900 leading-relaxed">
                                    <p className="font-bold text-slate-800 mb-2">【全額返金保証について】</p>
                                    <p className="mb-4 text-sm">
                                        契約期間終了時（6ヶ月後）に、制作した記事がGoogle検索で10位以内にランクインしなかった場合、
                                        ランクインしなかった記事の本数に応じた預り金を返金いたします。<br />
                                        全記事がランク外だった場合は、<span className="font-bold text-red-600">預り金を全額返金</span>いたします。
                                    </p>

                                    <div className="bg-slate-50 p-3 rounded border border-slate-200 mb-4 text-sm">
                                        <p className="font-bold mb-1">成果達成時の精算について</p>
                                        <p>
                                            10位以内にランクインした記事については、1記事あたり42,000円（税別）の成果報酬が発生します。<br />
                                            預り金から成果報酬額を差し引いた残額を返金いたします。
                                        </p>
                                    </div>

                                    <p className="font-bold text-slate-800 mb-2">【中途解約について】</p>
                                    <p className="text-sm">
                                        お客様都合による契約期間途中での解約は、原則としてお受けできません。
                                        ただし、やむを得ない事情により解約が合意された場合、実施済みの作業分（実費）を精算した上で返金等の対応を行います。
                                        この場合、全額返金保証の対象外となりますのでご注意ください。
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-blue-600 font-bold hover:underline">
                        トップページに戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
