import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import {
  exerciseDbEndpoints,
  exerciseOptions,
  fetchData,
  youtubeEndpoints,
  youtubeOptions,
} from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDetailData = await fetchData(exerciseDbEndpoints.exerciseById(id), exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const [exerciseVideosData, targetMuscleExercisesData, equipmentExercisesData] = await Promise.all([
        fetchData(youtubeEndpoints.search(`${exerciseDetailData.name} exercise`), youtubeOptions),
        fetchData(exerciseDbEndpoints.targetExercises(exerciseDetailData.target), exerciseOptions),
        fetchData(exerciseDbEndpoints.equipmentExercises(exerciseDetailData.equipment), exerciseOptions),
      ]);

      setExerciseVideos(exerciseVideosData.contents || []);
      setTargetMuscleExercises(Array.isArray(targetMuscleExercisesData) ? targetMuscleExercisesData : []);
      setEquipmentExercises(Array.isArray(equipmentExercisesData) ? equipmentExercisesData : []);
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
