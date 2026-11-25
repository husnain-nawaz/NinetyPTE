import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ListChecks } from 'lucide-react';
import PTEDashboardHeader from './PTEDashboardHeader';
import PTEDashboardTealFooter from './PTEDashboardTealFooter';
import {
  WEIGHTAGE_LEGEND,
  WEIGHTAGE_SECTIONS_ACADEMIC,
  WEIGHTAGE_SECTIONS_CORE,
} from './pteWeightageData';

function WeightageBadge({ value, colorClass }) {
  if (!value) return null;
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[40px] rounded-full px-2.5 py-0.5 text-[11.5px] font-bold text-white shadow-2xs ${colorClass}`}
    >
      {value}
    </span>
  );
}

/**
 * NinetyPTE Question Weightage matrix page (`/v1/question-weightage`, `/question-weightage`)
 * breaking down question counts and percentage contributions across Overall, Speaking,
 * Listening, Reading, and Writing.
 */
export default function PTEQuestionWeightagePage() {
  const navigate = useNavigate();
  const [examVariant, setExamVariant] = useState('academic');

  const isCore = examVariant === 'core';
  const sections = isCore ? WEIGHTAGE_SECTIONS_CORE : WEIGHTAGE_SECTIONS_ACADEMIC;

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader
        examVariant={examVariant}
        onChangeExamVariant={setExamVariant}
        onOpenReferModal={() => navigate('/dashboard')}
      />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
              <ListChecks className="w-4 h-4" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">
              Question Weightage
            </h1>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-[13px] font-semibold text-slate-600 hover:border-[#00b4c6] hover:text-[#0097a7] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Marks Distribution Table Card */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                {isCore ? 'PTE Core Marks Distribution' : 'PTE Academic Marks Distribution'}
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                Complete overview of all question types and scoring
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-[13px] font-semibold text-slate-600">
              {WEIGHTAGE_LEGEND.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#0b4a7b]">
            <table className="w-full min-w-[820px] border-collapse text-xs sm:text-[13px]">
              <thead>
                <tr className="bg-[#064e89] text-white font-bold">
                  <th colSpan={2} className="py-3.5 px-5 text-left">
                    Question Type
                  </th>
                  <th className="py-3.5 px-3 text-center">Questions</th>
                  <th className="py-3.5 px-3 text-center">Overall</th>
                  <th className="py-3.5 px-3 text-center">Speaking</th>
                  <th className="py-3.5 px-3 text-center">Listening</th>
                  <th className="py-3.5 px-3 text-center">Reading</th>
                  <th className="py-3.5 px-3 text-center">Writing</th>
                </tr>
              </thead>

              <tbody>
                {sections.map((section, sectionIdx) =>
                  section.rows.map((row, rowIdx) => {
                    const isFirstInSection = rowIdx === 0;
                    const isSectionStartBorder = sectionIdx > 0 && isFirstInSection;

                    return (
                      <tr
                        key={`${section.sectionLabel}-${row.name}`}
                        className={`border-b border-slate-200 hover:bg-slate-50/70 transition-colors ${
                          isSectionStartBorder ? 'border-t-2 border-t-[#064e89]/40' : ''
                        }`}
                      >
                        {isFirstInSection && (
                          <td
                            rowSpan={section.rows.length}
                            className="w-11 bg-white border-r border-slate-200 text-center align-middle select-none p-2"
                          >
                            <span
                              className="inline-block font-bold text-[#0c4a7e] text-xs whitespace-nowrap"
                              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                              {section.sectionLabel}
                            </span>
                          </td>
                        )}

                        <td className="py-3 px-4 font-medium text-slate-700 border-r border-slate-100">
                          <Link
                            to={row.to}
                            className="hover:text-[#00a8bd] hover:underline transition"
                          >
                            {row.name}
                          </Link>
                        </td>

                        <td className="py-3 px-3 text-center border-r border-slate-100">
                          <span className="inline-flex items-center justify-center min-w-[44px] rounded-full bg-slate-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-slate-700">
                            {row.questions}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center border-r border-slate-100">
                          <WeightageBadge value={row.overall} colorClass="bg-[#d946ef]" />
                        </td>

                        <td className="py-3 px-3 text-center border-r border-slate-100">
                          <WeightageBadge value={row.speaking} colorClass="bg-[#eb8c44]" />
                        </td>

                        <td className="py-3 px-3 text-center border-r border-slate-100">
                          <WeightageBadge value={row.listening} colorClass="bg-[#0b4a7b]" />
                        </td>

                        <td className="py-3 px-3 text-center border-r border-slate-100">
                          <WeightageBadge value={row.reading} colorClass="bg-[#22c55e]" />
                        </td>

                        <td className="py-3 px-3 text-center">
                          <WeightageBadge value={row.writing} colorClass="bg-[#5ba4f5]" />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              <tfoot>
                <tr className="bg-[#064e89] text-white font-bold text-xs sm:text-sm">
                  <td colSpan={2} className="py-3.5 px-5 uppercase tracking-wide">
                    TOTALS
                  </td>
                  <td className="py-3.5 px-3 text-center">-</td>
                  <td className="py-3.5 px-3 text-center">100%</td>
                  <td className="py-3.5 px-3 text-center">100%</td>
                  <td className="py-3.5 px-3 text-center">100%</td>
                  <td className="py-3.5 px-3 text-center">100%</td>
                  <td className="py-3.5 px-3 text-center">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Official Weighting Note Card */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-800 mb-1.5">Note:</h3>
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-500">
            The distribution shown above is approximate and based on Pearson&apos;s official weighting guidelines. Percentages represent the contribution of each question type to the respective skill score. The total possible score is 360 points, which is then scaled to the 90-point{' '}
            {isCore ? 'PTE Core' : 'PTE Academic'} score range.
          </p>
        </section>
      </main>

      <PTEDashboardTealFooter />
    </div>
  );
}
