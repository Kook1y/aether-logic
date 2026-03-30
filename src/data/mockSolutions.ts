import type { SolverProblem } from '@/types/solver'

const derivativeSolution: SolverProblem = {
  input: 'Find the derivative of x^3',
  topic: 'calculus',
  steps: [
    {
      id: 1,
      label: '01',
      title: 'Identify the Power Rule',
      explanation:
        'We recognize that f(x) = x^3 is a power function. The Power Rule states that for any function f(x) = x^n, the derivative is f\'(x) = n * x^(n-1). Here, n = 3.',
      latex: '\\frac{d}{dx}[x^n] = n \\cdot x^{n-1}',
      isExpanded: false,
      accentColor: 'primary',
    },
    {
      id: 2,
      label: '02',
      title: 'Apply the Power Rule',
      explanation:
        'Substituting n = 3 into the Power Rule formula, we bring down the exponent as a coefficient and reduce the exponent by one.',
      latex: '\\frac{d}{dx}[x^3] = 3 \\cdot x^{3-1} = 3x^2',
      isExpanded: false,
      accentColor: 'secondary',
    },
    {
      id: 3,
      label: '03',
      title: 'State the Result',
      explanation:
        'The derivative of x^3 with respect to x is 3x^2. This tells us the instantaneous rate of change of x^3 at any point x.',
      latex: 'f\'(x) = 3x^2',
      isExpanded: false,
      accentColor: 'tertiary',
    },
  ],
  finalResult: '\\boxed{f\'(x) = 3x^2}',
  finalLabel: 'Final Result',
}

const integralSolution: SolverProblem = {
  input: 'Find the integral of sin(x)',
  topic: 'calculus',
  steps: [
    {
      id: 1,
      label: '01',
      title: 'Recall the Antiderivative of sin(x)',
      explanation:
        'We need to find a function F(x) such that F\'(x) = sin(x). From standard antiderivative tables, we know that the derivative of -cos(x) is sin(x).',
      latex: '\\int \\sin(x)\\, dx',
      isExpanded: false,
      accentColor: 'primary',
    },
    {
      id: 2,
      label: '02',
      title: 'Verify by Differentiation',
      explanation:
        'To confirm, we differentiate -cos(x). The derivative of cos(x) is -sin(x), so the derivative of -cos(x) is sin(x), which matches our integrand.',
      latex: '\\frac{d}{dx}[-\\cos(x)] = -(-\\sin(x)) = \\sin(x) \\checkmark',
      isExpanded: false,
      accentColor: 'secondary',
    },
    {
      id: 3,
      label: '03',
      title: 'Add the Constant of Integration',
      explanation:
        'Since indefinite integration yields a family of functions differing by a constant, we append the constant of integration C.',
      latex: '\\int \\sin(x)\\, dx = -\\cos(x) + C',
      isExpanded: false,
      accentColor: 'tertiary',
    },
  ],
  finalResult: '\\boxed{-\\cos(x) + C}',
  finalLabel: 'Final Result',
}

const quadraticSolution: SolverProblem = {
  input: 'Solve x^2 - 5x + 6 = 0',
  topic: 'algebra',
  steps: [
    {
      id: 1,
      label: '01',
      title: 'Identify the Quadratic Form',
      explanation:
        'The equation x^2 - 5x + 6 = 0 is in standard quadratic form ax^2 + bx + c = 0, where a = 1, b = -5, and c = 6.',
      latex: 'ax^2 + bx + c = 0 \\quad \\Rightarrow \\quad a=1,\\; b=-5,\\; c=6',
      isExpanded: false,
      accentColor: 'primary',
    },
    {
      id: 2,
      label: '02',
      title: 'Compute the Discriminant',
      explanation:
        'The discriminant determines the nature and number of solutions. We compute b^2 - 4ac = 25 - 24 = 1. Since the discriminant is positive, there are two distinct real roots.',
      latex: '\\Delta = b^2 - 4ac = (-5)^2 - 4(1)(6) = 25 - 24 = 1',
      isExpanded: false,
      accentColor: 'secondary',
    },
    {
      id: 3,
      label: '03',
      title: 'Apply the Quadratic Formula',
      explanation:
        'Substituting the values into the quadratic formula, we get two solutions by using the plus and minus of the square root of the discriminant.',
      latex: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{5 \\pm \\sqrt{1}}{2} = \\frac{5 \\pm 1}{2}',
      isExpanded: false,
      accentColor: 'primary',
    },
    {
      id: 4,
      label: '04',
      title: 'Evaluate Both Roots',
      explanation:
        'Computing each branch: x = (5 + 1)/2 = 3 and x = (5 - 1)/2 = 2. We can verify by factoring: x^2 - 5x + 6 = (x - 2)(x - 3).',
      latex: 'x_1 = \\frac{5+1}{2} = 3, \\quad x_2 = \\frac{5-1}{2} = 2',
      isExpanded: false,
      accentColor: 'tertiary',
    },
  ],
  finalResult: '\\boxed{x = 2 \\quad \\text{or} \\quad x = 3}',
  finalLabel: 'Final Result',
}

const fallbackSolution: SolverProblem = {
  input: '',
  topic: 'algebra',
  steps: [
    {
      id: 1,
      label: '01',
      title: 'Parse the Expression',
      explanation:
        'We begin by carefully parsing the given mathematical expression, identifying its components, operations, and structure.',
      latex: '\\text{Analyzing input expression...}',
      isExpanded: false,
      accentColor: 'primary',
    },
    {
      id: 2,
      label: '02',
      title: 'Apply Relevant Techniques',
      explanation:
        'Based on the structure of the problem, we apply the appropriate mathematical techniques and simplification rules.',
      latex: '\\text{Applying transformations...}',
      isExpanded: false,
      accentColor: 'secondary',
    },
    {
      id: 3,
      label: '03',
      title: 'Simplify and Conclude',
      explanation:
        'We simplify the result into its most reduced form and verify correctness.',
      latex: '\\text{Solution complete}',
      isExpanded: false,
      accentColor: 'tertiary',
    },
  ],
  finalResult: '\\boxed{\\text{Solution computed}}',
  finalLabel: 'Final Result',
}

const solutionMap: Record<string, SolverProblem> = {
  derivative: derivativeSolution,
  'x^3': derivativeSolution,
  integral: integralSolution,
  sin: integralSolution,
  solve: quadraticSolution,
  quadratic: quadraticSolution,
  'x^2': quadraticSolution,
}

export function findSolution(input: string): SolverProblem {
  const lower = input.toLowerCase()
  for (const [keyword, solution] of Object.entries(solutionMap)) {
    if (lower.includes(keyword)) {
      return { ...solution, input }
    }
  }
  return { ...fallbackSolution, input }
}

export { derivativeSolution, integralSolution, quadraticSolution, fallbackSolution }
