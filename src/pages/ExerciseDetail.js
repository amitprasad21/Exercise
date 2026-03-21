import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

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
import Loader from '../components/Loader';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const exerciseDetailData = await fetchData(exerciseDbEndpoints.exerciseById(id), exerciseOptions);
        setExerciseDetail(exerciseDetailData);

        const [exerciseVideosResult, targetMuscleExercisesResult, equipmentExercisesResult] = await Promise.allSettled([
          fetchData(youtubeEndpoints.search(`${exerciseDetailData.name} exercise`), youtubeOptions),
          fetchData(exerciseDbEndpoints.targetExercises(exerciseDetailData.target), exerciseOptions),
          fetchData(exerciseDbEndpoints.equipmentExercises(exerciseDetailData.equipment), exerciseOptions),
        ]);

        setExerciseVideos(
          exerciseVideosResult.status === 'fulfilled' ? exerciseVideosResult.value.contents || [] : [],
        );
        setTargetMuscleExercises(
          targetMuscleExercisesResult.status === 'fulfilled' && Array.isArray(targetMuscleExercisesResult.value)
            ? targetMuscleExercisesResult.value
            : [],
        );
        setEquipmentExercises(
          equipmentExercisesResult.status === 'fulfilled' && Array.isArray(equipmentExercisesResult.value)
            ? equipmentExercisesResult.value
            : [],
        );
      } catch (error) {
        setLoadError(error.message || 'Unable to load this exercise right now.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (isLoading) {
    return <Loader message="Loading exercise details..." />;
  }

  if (loadError) {
    return (
      <Box sx={{ mt: { lg: '96px', xs: '60px' }, px: '20px' }}>
        <Typography color="error.main" textAlign="center">
          {loadError}
        </Typography>
      </Box>
    );
  }

  if (!exerciseDetail) {
    return (
      <Box sx={{ mt: { lg: '96px', xs: '60px' }, px: '20px' }}>
        <Typography textAlign="center">No Data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
