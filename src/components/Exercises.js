import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseDbEndpoints, exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      setIsLoading(true);
      setLoadError('');
      let exercisesData = [];

      try {
        const endpoint = bodyPart === 'all'
          ? exerciseDbEndpoints.allExercises()
          : exerciseDbEndpoints.bodyPartExercises(bodyPart);

        exercisesData = await fetchData(endpoint, exerciseOptions);

        if (!Array.isArray(exercisesData)) {
          throw new Error('Exercise API returned an unexpected response format.');
        }
      } catch (error) {
        setLoadError(error.message || 'Unable to load exercises right now. Please try again in a moment.');
      }

      setExercises(Array.isArray(exercisesData) ? exercisesData : []);
      setIsLoading(false);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const normalizedExercises = Array.isArray(exercises) ? exercises : [];
  const currentExercises = normalizedExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (isLoading) return <Loader message="Loading exercises..." />;

  if (loadError) {
    return (
      <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Typography textAlign="center" color="error.main" sx={{ fontSize: { lg: '24px', xs: '18px' } }}>
          {loadError}
        </Typography>
      </Box>
    );
  }

  if (!currentExercises.length) {
    return (
      <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Typography textAlign="center" sx={{ fontSize: { lg: '24px', xs: '18px' } }}>
          No exercises found for this selection.
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={exercise.id || idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {normalizedExercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(normalizedExercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
