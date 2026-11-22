export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          attachment_path: string | null
          author_id: string
          category: string
          class_id: string
          created_at: string
          description: string
          id: string
          pinned: boolean
          priority: string
          title: string
        }
        Insert: {
          attachment_path?: string | null
          author_id: string
          category?: string
          class_id: string
          created_at?: string
          description?: string
          id?: string
          pinned?: boolean
          priority?: string
          title: string
        }
        Update: {
          attachment_path?: string | null
          author_id?: string
          category?: string
          class_id?: string
          created_at?: string
          description?: string
          id?: string
          pinned?: boolean
          priority?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          comment: string
          created_at: string
          evaluated: boolean
          file_path: string | null
          history: Json
          id: string
          observation: string
          status: string
          student_id: string
          submitted_at: string | null
        }
        Insert: {
          assignment_id: string
          comment?: string
          created_at?: string
          evaluated?: boolean
          file_path?: string | null
          history?: Json
          id?: string
          observation?: string
          status?: string
          student_id: string
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string
          comment?: string
          created_at?: string
          evaluated?: boolean
          file_path?: string | null
          history?: Json
          id?: string
          observation?: string
          status?: string
          student_id?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          allow_replacement: boolean
          assessment_type: string
          attachment_path: string | null
          author_id: string
          class_id: string
          created_at: string
          description: string
          due_at: string
          id: string
          instructions: string
          priority: string
          subject_id: string | null
          title: string
        }
        Insert: {
          allow_replacement?: boolean
          assessment_type?: string
          attachment_path?: string | null
          author_id: string
          class_id: string
          created_at?: string
          description?: string
          due_at: string
          id?: string
          instructions?: string
          priority?: string
          subject_id?: string | null
          title: string
        }
        Update: {
          allow_replacement?: boolean
          assessment_type?: string
          attachment_path?: string | null
          author_id?: string
          class_id?: string
          created_at?: string
          description?: string
          due_at?: string
          id?: string
          instructions?: string
          priority?: string
          subject_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          record_id: string | null
          resource: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          record_id?: string | null
          resource: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          record_id?: string | null
          resource?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          author_id: string
          category: string
          class_id: string
          created_at: string
          description: string
          id: string
          starts_at: string
          title: string
        }
        Insert: {
          author_id: string
          category?: string
          class_id: string
          created_at?: string
          description?: string
          id?: string
          starts_at: string
          title: string
        }
        Update: {
          author_id?: string
          category?: string
          class_id?: string
          created_at?: string
          description?: string
          id?: string
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      class_members: {
        Row: {
          class_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_members_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedules: {
        Row: {
          class_id: string
          created_at: string
          end_time: string
          id: string
          is_break: boolean
          start_time: string
          subject_id: string | null
          weekday: number
        }
        Insert: {
          class_id: string
          created_at?: string
          end_time: string
          id?: string
          is_break?: boolean
          start_time: string
          subject_id?: string | null
          weekday: number
        }
        Update: {
          class_id?: string
          created_at?: string
          end_time?: string
          id?: string
          is_break?: boolean
          start_time?: string
          subject_id?: string | null
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "class_schedules_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_schedules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          course: string
          created_at: string
          id: string
          institution: string
          leader: string
          name: string
        }
        Insert: {
          course: string
          created_at?: string
          id?: string
          institution: string
          leader: string
          name: string
        }
        Update: {
          course?: string
          created_at?: string
          id?: string
          institution?: string
          leader?: string
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          description: string
          id: string
          is_read: boolean
          path: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          is_read?: boolean
          path?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_read?: boolean
          path?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          welcomed: boolean
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          welcomed?: boolean
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          welcomed?: boolean
        }
        Relationships: []
      }
      student_suggestions: {
        Row: {
          author_id: string
          class_id: string
          created_at: string
          description: string
          id: string
          status: string
          title: string
        }
        Insert: {
          author_id: string
          class_id: string
          created_at?: string
          description?: string
          id?: string
          status?: string
          title: string
        }
        Update: {
          author_id?: string
          class_id?: string
          created_at?: string
          description?: string
          id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_suggestions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_suggestions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          author_id: string
          class_id: string
          created_at: string
          description: string
          external_url: string | null
          file_path: string | null
          id: string
          subject_id: string | null
          title: string
        }
        Insert: {
          author_id: string
          class_id: string
          created_at?: string
          description?: string
          external_url?: string | null
          file_path?: string | null
          id?: string
          subject_id?: string | null
          title: string
        }
        Update: {
          author_id?: string
          class_id?: string
          created_at?: string
          description?: string
          external_url?: string | null
          file_path?: string | null
          id?: string
          subject_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_materials_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_materials_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          category: string
          class_id: string
          created_at: string
          id: string
          name: string
          teacher_id: string | null
        }
        Insert: {
          category?: string
          class_id: string
          created_at?: string
          id?: string
          name: string
          teacher_id?: string | null
        }
        Update: {
          category?: string
          class_id?: string
          created_at?: string
          id?: string
          name?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subjects_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_member: { Args: { _class: string }; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      set_user_role: {
        Args: {
          new_role: Database["public"]["Enums"]["app_role"]
          target_user: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "student" | "teacher" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "teacher", "admin"],
    },
  },
} as const
