# Dashboard Components

This directory contains the unified dashboard components that replace the previous role-specific components.

## Unified Components

- `UnifiedDashboardLayout.tsx`: A single layout component that can be used for all user roles
- `RoleSidebar.tsx`: A unified sidebar component that adapts to different user roles

## Migration

The following components have been replaced by the unified components:

1. `components/AdminLayout.tsx`
2. `components/OperatorLayout.tsx`
3. `components/TeacherLayout.tsx`
4. `components/HeadmasterLayout.tsx`
5. `components/AdminSidebar.tsx`
6. `components/OperatorSidebar.tsx`
7. `components/TeacherSidebar.tsx`
8. `components/HeadmasterSidebar.tsx`
9. `components/AppSidebar.tsx`
10. `components/DynamicSidebar.tsx`

All layout files in the app directory have been updated to use the unified components.

## Benefits

- Reduced code duplication
- Consistent UI across different user roles
- Easier maintenance
- Better organization of code
