import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutList } from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { usePortal } from '../../shared/portalContext';
import { CORE_EXAM_PATTERN_SECTIONS } from './examPatternData';

/**
 * PTE Core Exam Pattern page (/v1/exam-pattern, /exam-pattern, /v1/core/exam-pattern).
 * Presents section-wise PTE Core question types and average question counts.
 */
export default function CoreExamPatternPage() {
  const { setPortalMode } = usePortal();

  useEffect(() => {
    setPortalMode('core');
  }, [setPortalMode]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
            <LayoutList className="w-4 h-4" />
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">
            Exam Pattern
          </h1>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
              Exam Pattern for PTE Core
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              A quick overview of the PTE Core exam format, question types, and average question count across all modules.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#0b4a7b]">
            <table className="w-full min-w-[640px] border-collapse text-xs sm:text-[13px]">
              <thead>
                <tr className="bg-[#064e89] text-white font-bold">
                  <th colSpan={2} className="py-3.5 px-5 text-left">
                    Question Type
                  </th>
                  <th className="w-36 py-3.5 px-5 text-center">Avg Qs</th>
                </tr>
              </thead>

              <tbody>
                {CORE_EXAM_PATTERN_SECTIONS.map((section, sectionIdx) =>
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

                        <td className="py-3 px-4 font-medium text-slate-700">
                          <Link to={row.to} className="hover:text-[#00a8bd] hover:underline transition">
                            {row.name}
                          </Link>
                        </td>

                        <td className="w-36 py-3 px-5 text-center">
                          <span className="inline-flex items-center justify-center min-w-[46px] rounded-full bg-[#fdf2f5] border border-[#f5d5df] px-3 py-0.5 text-[11.5px] font-bold text-[#0f3554]">
                            {row.avgQuestions}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              <tfoot>
                <tr className="bg-[#064e89]">
                  <td colSpan={3} className="h-3 p-0" />
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />
    </div>
  );
}
