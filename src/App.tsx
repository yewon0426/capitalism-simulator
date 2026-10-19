/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  EraId,
  CommercialState,
  IndustrialState,
  ModifiedState,
  NeoliberalState,
  OperationExplanation
} from './types/capitalism';
import { ERAS } from './data/curriculumData';
import {
  COMMERCIAL_EXPLANATIONS,
  INDUSTRIAL_EXPLANATIONS,
  MODIFIED_EXPLANATIONS,
  NEOLIBERAL_EXPLANATIONS
} from './data/explanationData';
import { TimelineNav } from './components/TimelineNav';
import { ClassroomHUD } from './components/ClassroomHUD';
import { ControlDeck } from './components/ControlDeck';
import { CommercialDiorama } from './components/CommercialDiorama';
import { IndustrialDiorama } from './components/IndustrialDiorama';
import { ModifiedDiorama } from './components/ModifiedDiorama';
import { NeoliberalDiorama } from './components/NeoliberalDiorama';
import { ComprehensiveComparison } from './components/ComprehensiveComparison';
import { TeacherDrawer } from './components/TeacherDrawer';
import { LaserPointerOverlay } from './components/LaserPointerOverlay';
import { ConceptExplorationPanel } from './components/ConceptExplorationPanel';

export default function App() {
  const [currentEra, setCurrentEra] = useState<EraId>('commercial');

  // Commercial Era State
  const [commercialState, setCommercialState] = useState<CommercialState>({
    tradeExpanded: false,
    stateIntervention: false,
    shipCount: 1,
    goldReserves: 100,
    unloadedGoodsCount: 2,
  });

  // Industrial Era State
  const [industrialState, setIndustrialState] = useState<IndustrialState>({
    mechanization: false,
    marketCompetition: false,
    industrialShadows: false,
    manualProducedCount: 2,
    factoryProducedCount: 12,
  });

  // Modified Capitalism State
  const [modifiedState, setModifiedState] = useState<ModifiedState>({
    depressionTriggered: false,
    newDealPublicWorks: false,
    welfarePolicy: false,
  });

  // Neoliberalism State
  const [neoliberalState, setNeoliberalState] = useState<NeoliberalState>({
    oilShockStagflation: false,
    marketDeregulation: false,
    globalTradeFree: false,
  });

  // Active operation ID for the 4-step explanation side panel
  const [activeOperationId, setActiveOperationId] = useState<string>('tradeExpanded');

  // UI state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [projectorMode, setProjectorMode] = useState<boolean>(false);
  const [isLaserActive, setIsLaserActive] = useState<boolean>(false);
  const [isBeforeAfterActive, setIsBeforeAfterActive] = useState<boolean>(false);
  const [isTeacherDrawerOpen, setIsTeacherDrawerOpen] = useState<boolean>(false);
  const [isConceptPanelOpen, setIsConceptPanelOpen] = useState<boolean>(true);

  // Synchronize default operation when switching era
  const handleSelectEra = (era: EraId) => {
    setCurrentEra(era);
    setIsBeforeAfterActive(false);

    if (era === 'commercial') {
      setActiveOperationId('tradeExpanded');
    } else if (era === 'industrial') {
      setActiveOperationId('mechanization');
    } else if (era === 'modified') {
      setActiveOperationId('depressionTriggered');
    } else if (era === 'neoliberal') {
      setActiveOperationId('oilShockStagflation');
    }
  };

  // Reset handler for the current era
  const handleReset = () => {
    if (currentEra === 'commercial') {
      setCommercialState({
        tradeExpanded: false,
        stateIntervention: false,
        shipCount: 1,
        goldReserves: 100,
        unloadedGoodsCount: 2,
      });
      setActiveOperationId('tradeExpanded');
    } else if (currentEra === 'industrial') {
      setIndustrialState({
        mechanization: false,
        marketCompetition: false,
        industrialShadows: false,
        manualProducedCount: 2,
        factoryProducedCount: 12,
      });
      setActiveOperationId('mechanization');
    } else if (currentEra === 'modified') {
      setModifiedState({
        depressionTriggered: false,
        newDealPublicWorks: false,
        welfarePolicy: false,
      });
      setActiveOperationId('depressionTriggered');
    } else if (currentEra === 'neoliberal') {
      setNeoliberalState({
        oilShockStagflation: false,
        marketDeregulation: false,
        globalTradeFree: false,
      });
      setActiveOperationId('oilShockStagflation');
    }
    setIsBeforeAfterActive(false);
  };

  // State update helpers
  const updateCommercial = (updates: Partial<CommercialState>) => {
    setCommercialState((prev) => ({ ...prev, ...updates }));
  };

  const updateIndustrial = (updates: Partial<IndustrialState>) => {
    setIndustrialState((prev) => ({ ...prev, ...updates }));
  };

  const updateModified = (updates: Partial<ModifiedState>) => {
    setModifiedState((prev) => ({ ...prev, ...updates }));
  };

  const updateNeoliberal = (updates: Partial<NeoliberalState>) => {
    setNeoliberalState((prev) => ({ ...prev, ...updates }));
  };

  // Explanations for the current era
  const currentOperationsList: OperationExplanation[] = useMemo(() => {
    if (currentEra === 'commercial') return Object.values(COMMERCIAL_EXPLANATIONS);
    if (currentEra === 'industrial') return Object.values(INDUSTRIAL_EXPLANATIONS);
    if (currentEra === 'modified') return Object.values(MODIFIED_EXPLANATIONS);
    if (currentEra === 'neoliberal') return Object.values(NEOLIBERAL_EXPLANATIONS);
    return [];
  }, [currentEra]);

  const currentOperationData: OperationExplanation = useMemo(() => {
    const found = currentOperationsList.find((op) => op.operationId === activeOperationId);
    return found || currentOperationsList[0] || INDUSTRIAL_EXPLANATIONS.mechanization;
  }, [currentOperationsList, activeOperationId]);

  // Hotkey listener for classroom projector presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'p' || e.key === 'P') {
        setProjectorMode((prev) => !prev);
      } else if (e.key === 'l' || e.key === 'L') {
        setIsLaserActive((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        setIsTeacherDrawerOpen((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        setIsConceptPanelOpen((prev) => !prev);
      } else if (e.key === 'b' || e.key === 'B') {
        setIsBeforeAfterActive((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === '1') {
        if (currentEra === 'commercial') {
          setActiveOperationId('tradeExpanded');
          updateCommercial({ tradeExpanded: !commercialState.tradeExpanded });
        } else if (currentEra === 'industrial') {
          setActiveOperationId('mechanization');
          updateIndustrial({ mechanization: !industrialState.mechanization });
        } else if (currentEra === 'modified') {
          setActiveOperationId('depressionTriggered');
          updateModified({ depressionTriggered: !modifiedState.depressionTriggered });
        } else if (currentEra === 'neoliberal') {
          setActiveOperationId('oilShockStagflation');
          updateNeoliberal({ oilShockStagflation: !neoliberalState.oilShockStagflation });
        }
      } else if (e.key === '2') {
        if (currentEra === 'commercial') {
          setActiveOperationId('stateIntervention');
          updateCommercial({ stateIntervention: !commercialState.stateIntervention });
        } else if (currentEra === 'industrial') {
          setActiveOperationId('marketCompetition');
          updateIndustrial({ marketCompetition: !industrialState.marketCompetition });
        } else if (currentEra === 'modified') {
          setActiveOperationId('newDealPublicWorks');
          updateModified({ newDealPublicWorks: !modifiedState.newDealPublicWorks });
        } else if (currentEra === 'neoliberal') {
          setActiveOperationId('marketDeregulation');
          updateNeoliberal({ marketDeregulation: !neoliberalState.marketDeregulation });
        }
      } else if (e.key === '3') {
        if (currentEra === 'industrial') {
          setActiveOperationId('industrialShadows');
          updateIndustrial({ industrialShadows: !industrialState.industrialShadows });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentEra,
    commercialState,
    industrialState,
    modifiedState,
    neoliberalState,
  ]);

  // Effective state during Before/After mode
  const effectiveCommercialState: CommercialState = isBeforeAfterActive
    ? {
        tradeExpanded: false,
        stateIntervention: false,
        shipCount: 1,
        goldReserves: 100,
        unloadedGoodsCount: 2,
      }
    : commercialState;

  const effectiveIndustrialState: IndustrialState = isBeforeAfterActive
    ? {
        mechanization: false,
        marketCompetition: false,
        industrialShadows: false,
        manualProducedCount: 2,
        factoryProducedCount: 0,
      }
    : industrialState;

  const effectiveModifiedState: ModifiedState = isBeforeAfterActive
    ? {
        depressionTriggered: false,
        newDealPublicWorks: false,
        welfarePolicy: false,
      }
    : modifiedState;

  const effectiveNeoliberalState: NeoliberalState = isBeforeAfterActive
    ? {
        oilShockStagflation: false,
        marketDeregulation: false,
        globalTradeFree: false,
      }
    : neoliberalState;

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-hidden select-none transition-colors duration-500 ${
        projectorMode ? 'bg-slate-900 text-white' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* 1. TOP TIMELINE NAVIGATION */}
      <TimelineNav
        currentEra={currentEra}
        onSelectEra={handleSelectEra}
        projectorMode={projectorMode}
        onToggleProjector={() => setProjectorMode(!projectorMode)}
        onOpenTeacherDrawer={() => setIsTeacherDrawerOpen(true)}
      />

      {/* 2. CLASSROOM INQUIRY HUD (Core Question - Observation Focus - Core Concept) */}
      {currentEra !== 'comparison' && (
        <ClassroomHUD
          era={ERAS[currentEra]}
          projectorMode={projectorMode}
        />
      )}

      {/* 3. LIVING HISTORY DIORAMA STAGE (75~85% of screen area) */}
      <main className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* Active Laser Spotlight Presentation Overlay */}
        <LaserPointerOverlay isActive={isLaserActive} />

        {/* Before / After Banner overlay if active */}
        {isBeforeAfterActive && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-indigo-600/95 text-white text-xs font-bold shadow-2xl animate-pulse border border-indigo-400">
            전후 비교 모드: 조작 이전의 초기 상태(Before) 표시 중
          </div>
        )}

        {/* ERA 1: COMMERCIAL CAPITALISM DIORAMA */}
        {currentEra === 'commercial' && (
          <CommercialDiorama
            state={effectiveCommercialState}
            isPlaying={isPlaying}
            projectorMode={projectorMode}
          />
        )}

        {/* ERA 2: INDUSTRIAL CAPITALISM DIORAMA */}
        {currentEra === 'industrial' && (
          <IndustrialDiorama
            state={effectiveIndustrialState}
            isPlaying={isPlaying}
            projectorMode={projectorMode}
          />
        )}

        {/* ERA 3: MODIFIED CAPITALISM DIORAMA */}
        {currentEra === 'modified' && (
          <ModifiedDiorama
            state={effectiveModifiedState}
            isPlaying={isPlaying}
            projectorMode={projectorMode}
          />
        )}

        {/* ERA 4: NEOLIBERALISM DIORAMA */}
        {currentEra === 'neoliberal' && (
          <NeoliberalDiorama
            state={effectiveNeoliberalState}
            isPlaying={isPlaying}
            projectorMode={projectorMode}
          />
        )}

        {/* 4-ERA COMPREHENSIVE COMPARISON MATRIX */}
        {currentEra === 'comparison' && (
          <ComprehensiveComparison
            onNavigateToEra={(era) => {
              handleSelectEra(era);
            }}
            projectorMode={projectorMode}
          />
        )}

        {/* DOCKED SIDE CONCEPT EXPLORATION PANEL (Non-intrusive 4-Step Causality Deck) */}
        {currentEra !== 'comparison' && (
          <ConceptExplorationPanel
            currentOperation={currentOperationData}
            allOperations={currentOperationsList}
            onSelectOperation={(opId) => setActiveOperationId(opId)}
            isOpen={isConceptPanelOpen}
            onToggleOpen={() => setIsConceptPanelOpen(!isConceptPanelOpen)}
            projectorMode={projectorMode}
          />
        )}
      </main>

      {/* 4. BOTTOM TEACHER CONTROL DECK */}
      <ControlDeck
        currentEra={currentEra}
        commercialState={commercialState}
        industrialState={industrialState}
        modifiedState={modifiedState}
        neoliberalState={neoliberalState}
        activeOperationId={activeOperationId}
        isPlaying={isPlaying}
        isLaserActive={isLaserActive}
        isBeforeAfterActive={isBeforeAfterActive}
        isConceptPanelOpen={isConceptPanelOpen}
        projectorMode={projectorMode}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        onToggleLaser={() => setIsLaserActive(!isLaserActive)}
        onToggleBeforeAfter={() => setIsBeforeAfterActive(!isBeforeAfterActive)}
        onToggleConceptPanel={() => setIsConceptPanelOpen(!isConceptPanelOpen)}
        onSelectOperation={(opId) => setActiveOperationId(opId)}
        onUpdateCommercial={updateCommercial}
        onUpdateIndustrial={updateIndustrial}
        onUpdateModified={updateModified}
        onUpdateNeoliberal={updateNeoliberal}
      />

      {/* 5. SLIDE-OUT TEACHER CURRICULUM & CUE CARD DRAWER */}
      <TeacherDrawer
        isOpen={isTeacherDrawerOpen}
        onClose={() => setIsTeacherDrawerOpen(false)}
        currentEra={currentEra}
      />
    </div>
  );
}
