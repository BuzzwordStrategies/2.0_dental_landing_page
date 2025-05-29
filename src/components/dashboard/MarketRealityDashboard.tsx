'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IndustryCounter from './IndustryCounter';
import { industryStatistics, industryTrends } from '../../constants/industryData';

gsap.registerPlugin(ScrollTrigger);

export default function MarketRealityDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Animate section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    });

    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animate stat cards
    const cards = sectionRef.current.querySelectorAll('.stat-card');
    tl.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          The Market Reality You Can't Ignore
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          Live industry data shows the accelerating consolidation and digital transformation reshaping dental labs
        </p>

        {/* Main statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Dental Labs Decline */}
          <div className="stat-card bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
            <h3 className="text-yellow-500 font-semibold mb-6 text-center">DENTAL LABS CLOSING</h3>
            <div className="space-y-4">
              <IndustryCounter
                label="Labs in 2004"
                startValue={0}
                endValue={industryStatistics.dentalLabs.year2004}
                className="mb-4"
              />
              <IndustryCounter
                label="Labs Today"
                startValue={industryStatistics.dentalLabs.year2004}
                endValue={industryStatistics.dentalLabs.current}
                className="mb-4"
              />
              <div className="text-center pt-4 border-t border-gray-700">
                <div className="text-red-500 font-bold text-2xl mb-1">
                  {industryTrends.labsClosing.rate}
                </div>
                <div className="text-sm text-gray-400">Closing Rate</div>
              </div>
            </div>
          </div>

          {/* Workforce Crisis */}
          <div className="stat-card bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
            <h3 className="text-yellow-500 font-semibold mb-6 text-center">WORKFORCE CRISIS</h3>
            <div className="space-y-4">
              <IndustryCounter
                label="Average Technician Age"
                startValue={30}
                endValue={industryStatistics.workforce.averageTechnicianAge}
                decimals={1}
                className="mb-4"
              />
              <IndustryCounter
                label="Retiring Soon"
                startValue={0}
                endValue={industryStatistics.workforce.retirementPercentage}
                suffix="%"
                className="mb-4"
              />
              <div className="text-center pt-4 border-t border-gray-700">
                <div className="text-orange-500 font-bold text-xl mb-1">
                  {industryStatistics.workforce.shortageSeverity}
                </div>
                <div className="text-sm text-gray-400">Current Shortage</div>
              </div>
            </div>
          </div>

          {/* Market Control */}
          <div className="stat-card bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
            <h3 className="text-yellow-500 font-semibold mb-6 text-center">MARKET TAKEOVER</h3>
            <div className="space-y-4">
              <IndustryCounter
                label="Offshore Market Share"
                startValue={0}
                endValue={industryStatistics.marketShare.offshore}
                suffix="%"
                className="mb-4"
              />
              <IndustryCounter
                label="DSO Control"
                startValue={0}
                endValue={industryStatistics.marketShare.dso}
                suffix="%"
                className="mb-4"
              />
              <div className="text-center pt-4 border-t border-gray-700">
                <div className="text-purple-500 font-bold text-2xl mb-1">
                  {industryStatistics.marketShare.projectedCombined2030}%
                </div>
                <div className="text-sm text-gray-400">Combined by 2030</div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital adoption comparison */}
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Digital Marketing Adoption Gap
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {industryStatistics.digitalAdoption.medicalDeviceDigital}%
              </div>
              <div className="text-sm text-gray-400">Medical Device<br/>Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {industryStatistics.digitalAdoption.pharmaDigitalBudget}%
              </div>
              <div className="text-sm text-gray-400">Pharma Digital<br/>Budget</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {industryStatistics.digitalAdoption.dentalLabSocialMedia}%
              </div>
              <div className="text-sm text-gray-400">Dental Labs<br/>Social Media</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {industryStatistics.digitalAdoption.dentalLabSEO}%
              </div>
              <div className="text-sm text-gray-400">Dental Labs<br/>Investing in SEO</div>
            </div>
          </div>
        </div>

        {/* Source citation */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Sources: {industryStatistics.dentalLabs.source}, {industryStatistics.workforce.source}, {industryStatistics.marketShare.source}
          </p>
        </div>
      </div>
    </section>
  );
}
