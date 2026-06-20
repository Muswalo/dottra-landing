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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      account_capabilities: {
        Row: {
          created_at: string
          description: string
          display_name: string
          is_active: boolean
          key: string
          requires_strong_hold: boolean
        }
        Insert: {
          created_at?: string
          description: string
          display_name: string
          is_active?: boolean
          key: string
          requires_strong_hold?: boolean
        }
        Update: {
          created_at?: string
          description?: string
          display_name?: string
          is_active?: boolean
          key?: string
          requires_strong_hold?: boolean
        }
        Relationships: []
      }
      account_control_assignments: {
        Row: {
          account_control_id: string
          capability_key: string
          control_level: Database["public"]["Enums"]["account_control_level"]
          created_at: string
          deactivated_at: string | null
          deactivated_by: string | null
          ends_at: string | null
          id: string
          is_active: boolean
          matched_at: string
          priority: number
          reason: string
          segment_id: string
          starts_at: string | null
          updated_at: string
          user_id: string
          user_message: string | null
        }
        Insert: {
          account_control_id: string
          capability_key: string
          control_level: Database["public"]["Enums"]["account_control_level"]
          created_at?: string
          deactivated_at?: string | null
          deactivated_by?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          matched_at?: string
          priority?: number
          reason: string
          segment_id: string
          starts_at?: string | null
          updated_at?: string
          user_id: string
          user_message?: string | null
        }
        Update: {
          account_control_id?: string
          capability_key?: string
          control_level?: Database["public"]["Enums"]["account_control_level"]
          created_at?: string
          deactivated_at?: string | null
          deactivated_by?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          matched_at?: string
          priority?: number
          reason?: string
          segment_id?: string
          starts_at?: string | null
          updated_at?: string
          user_id?: string
          user_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_control_assignments_account_control_id_fkey"
            columns: ["account_control_id"]
            isOneToOne: false
            referencedRelation: "account_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_control_assignments_account_control_id_fkey"
            columns: ["account_control_id"]
            isOneToOne: false
            referencedRelation: "admin_account_control_impact_v"
            referencedColumns: ["account_control_id"]
          },
          {
            foreignKeyName: "account_control_assignments_capability_key_fkey"
            columns: ["capability_key"]
            isOneToOne: false
            referencedRelation: "account_capabilities"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "account_control_assignments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "account_segments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_control_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_control_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      account_control_capabilities: {
        Row: {
          account_control_id: string
          capability_key: string
          created_at: string
        }
        Insert: {
          account_control_id: string
          capability_key: string
          created_at?: string
        }
        Update: {
          account_control_id?: string
          capability_key?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_control_capabilities_account_control_id_fkey"
            columns: ["account_control_id"]
            isOneToOne: false
            referencedRelation: "account_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_control_capabilities_account_control_id_fkey"
            columns: ["account_control_id"]
            isOneToOne: false
            referencedRelation: "admin_account_control_impact_v"
            referencedColumns: ["account_control_id"]
          },
          {
            foreignKeyName: "account_control_capabilities_capability_key_fkey"
            columns: ["capability_key"]
            isOneToOne: false
            referencedRelation: "account_capabilities"
            referencedColumns: ["key"]
          },
        ]
      }
      account_controls: {
        Row: {
          control_level: Database["public"]["Enums"]["account_control_level"]
          created_at: string
          created_by: string | null
          deactivated_at: string | null
          deactivated_by: string | null
          ends_at: string | null
          id: string
          is_active: boolean
          priority: number
          reason: string
          segment_id: string
          starts_at: string | null
          updated_at: string
          updated_by: string | null
          user_message: string | null
        }
        Insert: {
          control_level?: Database["public"]["Enums"]["account_control_level"]
          created_at?: string
          created_by?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          priority?: number
          reason: string
          segment_id: string
          starts_at?: string | null
          updated_at?: string
          updated_by?: string | null
          user_message?: string | null
        }
        Update: {
          control_level?: Database["public"]["Enums"]["account_control_level"]
          created_at?: string
          created_by?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          priority?: number
          reason?: string
          segment_id?: string
          starts_at?: string | null
          updated_at?: string
          updated_by?: string | null
          user_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_controls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "account_segments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_controls_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_controls_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      account_segments: {
        Row: {
          created_at: string
          created_by: string | null
          deactivated_at: string | null
          deactivated_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          segment_type: Database["public"]["Enums"]["account_segment_type"]
          university_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          segment_type: Database["public"]["Enums"]["account_segment_type"]
          university_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          segment_type?: Database["public"]["Enums"]["account_segment_type"]
          university_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_segments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "supported_universities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_segments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "account_segments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_audit_events: {
        Row: {
          action: string
          actor_admin_user_id: string
          created_at: string
          id: string
          metadata: Json
          request_id: string | null
          resource_id: string | null
          resource_type: string
          target_user_id: string | null
        }
        Insert: {
          action: string
          actor_admin_user_id: string
          created_at?: string
          id?: string
          metadata?: Json
          request_id?: string | null
          resource_id?: string | null
          resource_type: string
          target_user_id?: string | null
        }
        Update: {
          action?: string
          actor_admin_user_id?: string
          created_at?: string
          id?: string
          metadata?: Json
          request_id?: string | null
          resource_id?: string | null
          resource_type?: string
          target_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_events_actor_admin_user_id_fkey"
            columns: ["actor_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_audit_events_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_audit_events_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_audit_events_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_audit_events_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_audit_events_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_operation_rate_limits: {
        Row: {
          actor_admin_user_id: string
          operation: string
          request_count: number
          updated_at: string
          window_start: string
        }
        Insert: {
          actor_admin_user_id: string
          operation: string
          request_count?: number
          updated_at?: string
          window_start: string
        }
        Update: {
          actor_admin_user_id?: string
          operation?: string
          request_count?: number
          updated_at?: string
          window_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_operation_rate_limits_actor_admin_user_id_fkey"
            columns: ["actor_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          created_by: string | null
          deactivated_at: string | null
          deactivated_by: string | null
          is_active: boolean
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          is_active?: boolean
          role: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deactivated_at?: string | null
          deactivated_by?: string | null
          is_active?: boolean
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_users_deactivated_by_fkey"
            columns: ["deactivated_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      biometric_credentials: {
        Row: {
          algorithm: string
          attestation: string | null
          biometric_strength: string
          created_at: string
          device_id: string
          hardware_backed: boolean | null
          id: string
          is_active: boolean
          key_alias: string | null
          key_type: string
          last_used_at: string | null
          public_key: string
          public_key_format: string
          revoked_at: string | null
          strongbox_backed: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          algorithm?: string
          attestation?: string | null
          biometric_strength?: string
          created_at?: string
          device_id: string
          hardware_backed?: boolean | null
          id?: string
          is_active?: boolean
          key_alias?: string | null
          key_type?: string
          last_used_at?: string | null
          public_key: string
          public_key_format?: string
          revoked_at?: string | null
          strongbox_backed?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          algorithm?: string
          attestation?: string | null
          biometric_strength?: string
          created_at?: string
          device_id?: string
          hardware_backed?: boolean | null
          id?: string
          is_active?: boolean
          key_alias?: string | null
          key_type?: string
          last_used_at?: string | null
          public_key?: string
          public_key_format?: string
          revoked_at?: string | null
          strongbox_backed?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biometric_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "biometric_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "biometric_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "biometric_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "biometric_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      credit_limit_history: {
        Row: {
          created_at: string
          effective_from: string
          id: string
          idempotency_key: string | null
          new_limit: number
          note: string | null
          previous_limit: number
          reason: Database["public"]["Enums"]["credit_limit_change_reason"]
          set_by: string | null
          set_by_admin_user_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          effective_from?: string
          id?: string
          idempotency_key?: string | null
          new_limit: number
          note?: string | null
          previous_limit?: number
          reason: Database["public"]["Enums"]["credit_limit_change_reason"]
          set_by?: string | null
          set_by_admin_user_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          effective_from?: string
          id?: string
          idempotency_key?: string | null
          new_limit?: number
          note?: string | null
          previous_limit?: number
          reason?: Database["public"]["Enums"]["credit_limit_change_reason"]
          set_by?: string | null
          set_by_admin_user_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_limit_history_set_by_admin_user_id_fkey"
            columns: ["set_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_limit_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      credit_packages: {
        Row: {
          amount: number
          created_at: string
          duration_days: number
          id: string
          interest_rate: number
          is_active: boolean
          name: string
          processing_fee: number
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          amount: number
          created_at?: string
          duration_days: number
          id?: string
          interest_rate: number
          is_active?: boolean
          name: string
          processing_fee?: number
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          amount?: number
          created_at?: string
          duration_days?: number
          id?: string
          interest_rate?: number
          is_active?: boolean
          name?: string
          processing_fee?: number
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          authorization_method:
            | Database["public"]["Enums"]["transaction_authorization_method"]
            | null
          authorized_at: string | null
          created_at: string
          currency: string
          draw_intent_hash: string | null
          failure_code: string | null
          fees: number | null
          fixed_charge_amount: number | null
          id: string
          idempotency_key: string | null
          ledger_posted_at: string | null
          loan_id: string | null
          network: string | null
          package_id: string | null
          payout_amount: number | null
          phone_number: string | null
          pin_verified_at: string | null
          principal_amount: number | null
          processing_fee: number | null
          provider: string
          provider_response: Json | null
          provider_status: Database["public"]["Enums"]["disbursement_provider_status"]
          reference: string | null
          requires_operator_review: boolean
          status: Database["public"]["Enums"]["credit_transaction_status"]
          total_repayable: number | null
          transaction_type: Database["public"]["Enums"]["credit_transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          authorization_method?:
            | Database["public"]["Enums"]["transaction_authorization_method"]
            | null
          authorized_at?: string | null
          created_at?: string
          currency?: string
          draw_intent_hash?: string | null
          failure_code?: string | null
          fees?: number | null
          fixed_charge_amount?: number | null
          id?: string
          idempotency_key?: string | null
          ledger_posted_at?: string | null
          loan_id?: string | null
          network?: string | null
          package_id?: string | null
          payout_amount?: number | null
          phone_number?: string | null
          pin_verified_at?: string | null
          principal_amount?: number | null
          processing_fee?: number | null
          provider?: string
          provider_response?: Json | null
          provider_status?: Database["public"]["Enums"]["disbursement_provider_status"]
          reference?: string | null
          requires_operator_review?: boolean
          status?: Database["public"]["Enums"]["credit_transaction_status"]
          total_repayable?: number | null
          transaction_type: Database["public"]["Enums"]["credit_transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          authorization_method?:
            | Database["public"]["Enums"]["transaction_authorization_method"]
            | null
          authorized_at?: string | null
          created_at?: string
          currency?: string
          draw_intent_hash?: string | null
          failure_code?: string | null
          fees?: number | null
          fixed_charge_amount?: number | null
          id?: string
          idempotency_key?: string | null
          ledger_posted_at?: string | null
          loan_id?: string | null
          network?: string | null
          package_id?: string | null
          payout_amount?: number | null
          phone_number?: string | null
          pin_verified_at?: string | null
          principal_amount?: number | null
          processing_fee?: number | null
          provider?: string
          provider_response?: Json | null
          provider_status?: Database["public"]["Enums"]["disbursement_provider_status"]
          reference?: string | null
          requires_operator_review?: boolean
          status?: Database["public"]["Enums"]["credit_transaction_status"]
          total_repayable?: number | null
          transaction_type?: Database["public"]["Enums"]["credit_transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "admin_mandate_schedule_ready_v"
            referencedColumns: ["loan_id"]
          },
          {
            foreignKeyName: "credit_transactions_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_transactions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "credit_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      direct_debit_mandates: {
        Row: {
          account_holder_name: string
          account_number_last4: string
          bank_name: string
          created_at: string
          id: string
          preferred_debit_day: number
          provider_reference: string | null
          status: Database["public"]["Enums"]["direct_debit_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          account_holder_name: string
          account_number_last4: string
          bank_name: string
          created_at?: string
          id?: string
          preferred_debit_day: number
          provider_reference?: string | null
          status?: Database["public"]["Enums"]["direct_debit_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          account_holder_name?: string
          account_number_last4?: string
          bank_name?: string
          created_at?: string
          id?: string
          preferred_debit_day?: number
          provider_reference?: string | null
          status?: Database["public"]["Enums"]["direct_debit_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_debit_mandates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "direct_debit_mandates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "direct_debit_mandates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "direct_debit_mandates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "direct_debit_mandates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          full_name: string
          id: string
          phone_number: string
          relationship: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          phone_number: string
          relationship: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          phone_number?: string
          relationship?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      employment_verifications: {
        Row: {
          created_at: string
          employee_id: string | null
          employer_name: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          id: string
          job_title: string
          net_salary: number
          pay_day: number | null
          pay_frequency: Database["public"]["Enums"]["pay_frequency"]
          payslip_urls: string[]
          rejected_reason: string | null
          status: Database["public"]["Enums"]["employment_verification_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          employee_id?: string | null
          employer_name: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          id?: string
          job_title: string
          net_salary: number
          pay_day?: number | null
          pay_frequency: Database["public"]["Enums"]["pay_frequency"]
          payslip_urls?: string[]
          rejected_reason?: string | null
          status?: Database["public"]["Enums"]["employment_verification_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string | null
          employer_name?: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          id?: string
          job_title?: string
          net_salary?: number
          pay_day?: number | null
          pay_frequency?: Database["public"]["Enums"]["pay_frequency"]
          payslip_urls?: string[]
          rejected_reason?: string | null
          status?: Database["public"]["Enums"]["employment_verification_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      kyc_records: {
        Row: {
          created_at: string
          id: string
          nrc_back_url: string | null
          nrc_front_url: string | null
          rejected_reason: string | null
          selfie_url: string | null
          updated_at: string
          user_id: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          nrc_back_url?: string | null
          nrc_front_url?: string | null
          rejected_reason?: string | null
          selfie_url?: string | null
          updated_at?: string
          user_id: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          created_at?: string
          id?: string
          nrc_back_url?: string | null
          nrc_front_url?: string | null
          rejected_reason?: string | null
          selfie_url?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ledger_accounts: {
        Row: {
          account_type: Database["public"]["Enums"]["ledger_account_type"]
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          account_type: Database["public"]["Enums"]["ledger_account_type"]
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["ledger_account_type"]
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ledger_entries: {
        Row: {
          account_id: string
          account_type: Database["public"]["Enums"]["ledger_account_type"]
          amount: number
          balance_after: number
          created_at: string
          entry_date: string
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          id: string
          transaction_id: string
          user_id: string | null
        }
        Insert: {
          account_id: string
          account_type: Database["public"]["Enums"]["ledger_account_type"]
          amount: number
          balance_after: number
          created_at?: string
          entry_date?: string
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          id?: string
          transaction_id: string
          user_id?: string | null
        }
        Update: {
          account_id?: string
          account_type?: Database["public"]["Enums"]["ledger_account_type"]
          amount?: number
          balance_after?: number
          created_at?: string
          entry_date?: string
          entry_type?: Database["public"]["Enums"]["ledger_entry_type"]
          id?: string
          transaction_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_loan_account_id"]
          },
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_accounts_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ledger_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "admin_operator_review_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "admin_transaction_monitor_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "credit_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      loans: {
        Row: {
          created_at: string
          disbursed_at: string | null
          disbursement_tx_id: string | null
          due_date: string
          expected_installment_count: number
          fixed_charge_amount: number | null
          id: string
          interest_rate: number
          manual_repayment_blocked: boolean
          package_id: string | null
          payout_amount: number | null
          principal: number
          processing_fee: number | null
          repayment_schedule_status: Database["public"]["Enums"]["repayment_schedule_status"]
          status: Database["public"]["Enums"]["loan_status"]
          total_repayable: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          disbursed_at?: string | null
          disbursement_tx_id?: string | null
          due_date: string
          expected_installment_count?: number
          fixed_charge_amount?: number | null
          id?: string
          interest_rate: number
          manual_repayment_blocked?: boolean
          package_id?: string | null
          payout_amount?: number | null
          principal: number
          processing_fee?: number | null
          repayment_schedule_status?: Database["public"]["Enums"]["repayment_schedule_status"]
          status?: Database["public"]["Enums"]["loan_status"]
          total_repayable?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          disbursed_at?: string | null
          disbursement_tx_id?: string | null
          due_date?: string
          expected_installment_count?: number
          fixed_charge_amount?: number | null
          id?: string
          interest_rate?: number
          manual_repayment_blocked?: boolean
          package_id?: string | null
          payout_amount?: number | null
          principal?: number
          processing_fee?: number | null
          repayment_schedule_status?: Database["public"]["Enums"]["repayment_schedule_status"]
          status?: Database["public"]["Enums"]["loan_status"]
          total_repayable?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loans_disbursement_tx_id_fkey"
            columns: ["disbursement_tx_id"]
            isOneToOne: false
            referencedRelation: "admin_operator_review_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "loans_disbursement_tx_id_fkey"
            columns: ["disbursement_tx_id"]
            isOneToOne: false
            referencedRelation: "admin_transaction_monitor_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "loans_disbursement_tx_id_fkey"
            columns: ["disbursement_tx_id"]
            isOneToOne: false
            referencedRelation: "credit_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "credit_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notice_audience_snapshots: {
        Row: {
          audience_params: Json
          audience_type: Database["public"]["Enums"]["notice_audience_type"]
          id: string
          notice_id: string
          recipient_count: number
          resolved_at: string
          resolved_by_admin_user_id: string | null
        }
        Insert: {
          audience_params?: Json
          audience_type: Database["public"]["Enums"]["notice_audience_type"]
          id?: string
          notice_id: string
          recipient_count?: number
          resolved_at?: string
          resolved_by_admin_user_id?: string | null
        }
        Update: {
          audience_params?: Json
          audience_type?: Database["public"]["Enums"]["notice_audience_type"]
          id?: string
          notice_id?: string
          recipient_count?: number
          resolved_at?: string
          resolved_by_admin_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notice_audience_snapshots_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: true
            referencedRelation: "admin_notices_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_audience_snapshots_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: true
            referencedRelation: "notices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_audience_snapshots_resolved_by_admin_user_id_fkey"
            columns: ["resolved_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notice_receipts: {
        Row: {
          created_at: string
          failure_code: string | null
          failure_message: string | null
          id: string
          notice_id: string
          notification_created_at: string | null
          notification_id: string | null
          seen_at: string | null
          snapshot_id: string
          status: Database["public"]["Enums"]["notice_receipt_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          notice_id: string
          notification_created_at?: string | null
          notification_id?: string | null
          seen_at?: string | null
          snapshot_id: string
          status?: Database["public"]["Enums"]["notice_receipt_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          failure_code?: string | null
          failure_message?: string | null
          id?: string
          notice_id?: string
          notification_created_at?: string | null
          notification_id?: string | null
          seen_at?: string | null
          snapshot_id?: string
          status?: Database["public"]["Enums"]["notice_receipt_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notice_receipts_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "admin_notices_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "notices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_snapshot_id_fkey"
            columns: ["snapshot_id"]
            isOneToOne: false
            referencedRelation: "admin_notices_v"
            referencedColumns: ["snapshot_id"]
          },
          {
            foreignKeyName: "notice_receipts_snapshot_id_fkey"
            columns: ["snapshot_id"]
            isOneToOne: false
            referencedRelation: "notice_audience_snapshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notices: {
        Row: {
          action_route: string | null
          archived_at: string | null
          archived_by_admin_user_id: string | null
          audience_params: Json
          audience_type: Database["public"]["Enums"]["notice_audience_type"]
          cancelled_at: string | null
          cancelled_by_admin_user_id: string | null
          created_at: string
          id: string
          message: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          published_at: string | null
          published_by_admin_user_id: string | null
          status: Database["public"]["Enums"]["notice_status"]
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          action_route?: string | null
          archived_at?: string | null
          archived_by_admin_user_id?: string | null
          audience_params?: Json
          audience_type: Database["public"]["Enums"]["notice_audience_type"]
          cancelled_at?: string | null
          cancelled_by_admin_user_id?: string | null
          created_at?: string
          id?: string
          message: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          published_at?: string | null
          published_by_admin_user_id?: string | null
          status?: Database["public"]["Enums"]["notice_status"]
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          action_route?: string | null
          archived_at?: string | null
          archived_by_admin_user_id?: string | null
          audience_params?: Json
          audience_type?: Database["public"]["Enums"]["notice_audience_type"]
          cancelled_at?: string | null
          cancelled_by_admin_user_id?: string | null
          created_at?: string
          id?: string
          message?: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          published_at?: string | null
          published_by_admin_user_id?: string | null
          status?: Database["public"]["Enums"]["notice_status"]
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notices_archived_by_admin_user_id_fkey"
            columns: ["archived_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notices_cancelled_by_admin_user_id_fkey"
            columns: ["cancelled_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notices_published_by_admin_user_id_fkey"
            columns: ["published_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notification_deliveries: {
        Row: {
          attempt_count: number
          channel: Database["public"]["Enums"]["notification_delivery_channel"]
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          idempotency_key: string
          last_attempted_at: string | null
          max_attempts: number
          notification_id: string
          provider_message_id: string | null
          provider_response: Json
          skipped_reason: string | null
          status: Database["public"]["Enums"]["notification_delivery_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          attempt_count?: number
          channel: Database["public"]["Enums"]["notification_delivery_channel"]
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          idempotency_key: string
          last_attempted_at?: string | null
          max_attempts?: number
          notification_id: string
          provider_message_id?: string | null
          provider_response?: Json
          skipped_reason?: string | null
          status?: Database["public"]["Enums"]["notification_delivery_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          attempt_count?: number
          channel?: Database["public"]["Enums"]["notification_delivery_channel"]
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          idempotency_key?: string
          last_attempted_at?: string | null
          max_attempts?: number
          notification_id?: string
          provider_message_id?: string | null
          provider_response?: Json
          skipped_reason?: string | null
          status?: Database["public"]["Enums"]["notification_delivery_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_deliveries_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_route: string | null
          created_at: string
          id: string
          message: string
          metadata: Json
          notification_type: Database["public"]["Enums"]["notification_type"]
          read_at: string | null
          summary: string | null
          title: string
          type: Database["public"]["Enums"]["notification_category"]
          updated_at: string
          user_id: string
        }
        Insert: {
          action_route?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json
          notification_type?: Database["public"]["Enums"]["notification_type"]
          read_at?: string | null
          summary?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_category"]
          updated_at?: string
          user_id: string
        }
        Update: {
          action_route?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json
          notification_type?: Database["public"]["Enums"]["notification_type"]
          read_at?: string | null
          summary?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_category"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      personal_info: {
        Row: {
          created_at: string
          date_of_birth: string | null
          legal_name: string | null
          nrc_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          legal_name?: string | null
          nrc_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          legal_name?: string | null
          nrc_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "personal_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "personal_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "personal_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "personal_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "personal_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      phone_verifications: {
        Row: {
          attempts: number
          created_at: string
          expires_at: string
          id: string
          otp_hash: string
          otp_salt: string
          phone_number: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          expires_at: string
          id?: string
          otp_hash: string
          otp_salt: string
          phone_number: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          expires_at?: string
          id?: string
          otp_hash?: string
          otp_salt?: string
          phone_number?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "phone_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "phone_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "phone_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "phone_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      pin_credentials: {
        Row: {
          created_at: string
          failed_attempts: number
          locked_until: string | null
          pin_hash: string
          pin_salt: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          failed_attempts?: number
          locked_until?: string | null
          pin_hash: string
          pin_salt: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          failed_attempts?: number
          locked_until?: string | null
          pin_hash?: string
          pin_salt?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pin_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pin_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pin_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pin_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pin_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      policy_documents: {
        Row: {
          created_at: string
          created_by_admin_user_id: string | null
          default_title: string
          description: string | null
          id: string
          is_active: boolean
          key: Database["public"]["Enums"]["policy_document_key"]
          updated_at: string
          updated_by_admin_user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_admin_user_id?: string | null
          default_title: string
          description?: string | null
          id?: string
          is_active?: boolean
          key: Database["public"]["Enums"]["policy_document_key"]
          updated_at?: string
          updated_by_admin_user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_admin_user_id?: string | null
          default_title?: string
          description?: string | null
          id?: string
          is_active?: boolean
          key?: Database["public"]["Enums"]["policy_document_key"]
          updated_at?: string
          updated_by_admin_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_documents_created_by_admin_user_id_fkey"
            columns: ["created_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "policy_documents_updated_by_admin_user_id_fkey"
            columns: ["updated_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      policy_version_sections: {
        Row: {
          body: string[]
          created_at: string
          id: string
          policy_version_id: string
          sort_order: number
          title: string
        }
        Insert: {
          body: string[]
          created_at?: string
          id?: string
          policy_version_id: string
          sort_order: number
          title: string
        }
        Update: {
          body?: string[]
          created_at?: string
          id?: string
          policy_version_id?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_version_sections_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "admin_policy_documents_v"
            referencedColumns: ["published_version_id"]
          },
          {
            foreignKeyName: "policy_version_sections_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "policy_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_version_sections_policy_version_id_fkey"
            columns: ["policy_version_id"]
            isOneToOne: false
            referencedRelation: "published_policies_v"
            referencedColumns: ["policy_version_id"]
          },
        ]
      }
      policy_versions: {
        Row: {
          archived_at: string | null
          archived_by_admin_user_id: string | null
          created_at: string
          created_by_admin_user_id: string | null
          effective_at: string | null
          eyebrow: string
          footer_note: string | null
          id: string
          policy_document_id: string
          published_at: string | null
          published_by_admin_user_id: string | null
          status: Database["public"]["Enums"]["policy_version_status"]
          summary: string
          title: string
          updated_at: string
          version_number: number
        }
        Insert: {
          archived_at?: string | null
          archived_by_admin_user_id?: string | null
          created_at?: string
          created_by_admin_user_id?: string | null
          effective_at?: string | null
          eyebrow: string
          footer_note?: string | null
          id?: string
          policy_document_id: string
          published_at?: string | null
          published_by_admin_user_id?: string | null
          status?: Database["public"]["Enums"]["policy_version_status"]
          summary: string
          title: string
          updated_at?: string
          version_number: number
        }
        Update: {
          archived_at?: string | null
          archived_by_admin_user_id?: string | null
          created_at?: string
          created_by_admin_user_id?: string | null
          effective_at?: string | null
          eyebrow?: string
          footer_note?: string | null
          id?: string
          policy_document_id?: string
          published_at?: string | null
          published_by_admin_user_id?: string | null
          status?: Database["public"]["Enums"]["policy_version_status"]
          summary?: string
          title?: string
          updated_at?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "policy_versions_archived_by_admin_user_id_fkey"
            columns: ["archived_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "policy_versions_created_by_admin_user_id_fkey"
            columns: ["created_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "policy_versions_policy_document_id_fkey"
            columns: ["policy_document_id"]
            isOneToOne: false
            referencedRelation: "admin_policy_documents_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_versions_policy_document_id_fkey"
            columns: ["policy_document_id"]
            isOneToOne: false
            referencedRelation: "policy_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_versions_published_by_admin_user_id_fkey"
            columns: ["published_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          phone_number: string | null
          phone_verified_at: string | null
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          full_name: string
          phone_number?: string | null
          phone_verified_at?: string | null
          updated_at?: string
          user_id: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          full_name?: string
          phone_number?: string | null
          phone_verified_at?: string | null
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      repayment_mandate_batch_items: {
        Row: {
          account_holder_name: string
          account_number_last4: string
          amount: number
          bank_name: string
          batch_id: string
          created_at: string
          debit_date: string
          external_reference: string
          id: string
          installment_number: number
          loan_id: string
          mandate_id: string
          mandate_provider_reference: string | null
          processed_at: string | null
          provider_result_code: string | null
          provider_result_message: string | null
          status: Database["public"]["Enums"]["repayment_mandate_instruction_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          account_holder_name: string
          account_number_last4: string
          amount: number
          bank_name: string
          batch_id: string
          created_at?: string
          debit_date: string
          external_reference: string
          id?: string
          installment_number?: number
          loan_id: string
          mandate_id: string
          mandate_provider_reference?: string | null
          processed_at?: string | null
          provider_result_code?: string | null
          provider_result_message?: string | null
          status?: Database["public"]["Enums"]["repayment_mandate_instruction_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          account_holder_name?: string
          account_number_last4?: string
          amount?: number
          bank_name?: string
          batch_id?: string
          created_at?: string
          debit_date?: string
          external_reference?: string
          id?: string
          installment_number?: number
          loan_id?: string
          mandate_id?: string
          mandate_provider_reference?: string | null
          processed_at?: string | null
          provider_result_code?: string | null
          provider_result_message?: string | null
          status?: Database["public"]["Enums"]["repayment_mandate_instruction_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "repayment_mandate_batch_items_batch_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "admin_mandate_batch_summary_v"
            referencedColumns: ["batch_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_batch_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "repayment_mandate_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_loan_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "admin_mandate_schedule_ready_v"
            referencedColumns: ["loan_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_loan_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_mandate_fkey"
            columns: ["mandate_id"]
            isOneToOne: false
            referencedRelation: "admin_mandate_schedule_ready_v"
            referencedColumns: ["mandate_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_mandate_fkey"
            columns: ["mandate_id"]
            isOneToOne: false
            referencedRelation: "direct_debit_mandates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "repayment_mandate_batch_items_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      repayment_mandate_batches: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by_admin_user_id: string
          exported_at: string | null
          id: string
          note: string | null
          status: Database["public"]["Enums"]["repayment_mandate_batch_status"]
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by_admin_user_id: string
          exported_at?: string | null
          id?: string
          note?: string | null
          status?: Database["public"]["Enums"]["repayment_mandate_batch_status"]
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by_admin_user_id?: string
          exported_at?: string | null
          id?: string
          note?: string | null
          status?: Database["public"]["Enums"]["repayment_mandate_batch_status"]
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "repayment_mandate_batches_created_by_fkey"
            columns: ["created_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      repayment_mandate_result_imports: {
        Row: {
          applied_row_count: number
          created_at: string
          created_by_admin_user_id: string
          file_name: string
          id: string
          matched_row_count: number
          row_count: number
          unmatched_row_count: number
        }
        Insert: {
          applied_row_count?: number
          created_at?: string
          created_by_admin_user_id: string
          file_name: string
          id?: string
          matched_row_count?: number
          row_count?: number
          unmatched_row_count?: number
        }
        Update: {
          applied_row_count?: number
          created_at?: string
          created_by_admin_user_id?: string
          file_name?: string
          id?: string
          matched_row_count?: number
          row_count?: number
          unmatched_row_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "repayment_mandate_result_imports_created_by_fkey"
            columns: ["created_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      repayment_mandate_result_rows: {
        Row: {
          applied: boolean
          batch_item_id: string | null
          created_at: string
          external_reference: string
          id: string
          import_id: string
          matched: boolean
          processed_at: string | null
          raw_row: Json
          result_code: string | null
          result_message: string | null
          result_status: string
        }
        Insert: {
          applied?: boolean
          batch_item_id?: string | null
          created_at?: string
          external_reference: string
          id?: string
          import_id: string
          matched?: boolean
          processed_at?: string | null
          raw_row?: Json
          result_code?: string | null
          result_message?: string | null
          result_status: string
        }
        Update: {
          applied?: boolean
          batch_item_id?: string | null
          created_at?: string
          external_reference?: string
          id?: string
          import_id?: string
          matched?: boolean
          processed_at?: string | null
          raw_row?: Json
          result_code?: string | null
          result_message?: string | null
          result_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "repayment_mandate_result_rows_batch_item_fkey"
            columns: ["batch_item_id"]
            isOneToOne: false
            referencedRelation: "repayment_mandate_batch_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repayment_mandate_result_rows_import_fkey"
            columns: ["import_id"]
            isOneToOne: false
            referencedRelation: "repayment_mandate_result_imports"
            referencedColumns: ["id"]
          },
        ]
      }
      student_verifications: {
        Row: {
          created_at: string
          graduation_year: number
          helsb_contract_url: string | null
          id: string
          rejected_reason: string | null
          student_id: string
          university_id: string | null
          university_id_url: string | null
          university_name: string
          updated_at: string
          user_id: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          created_at?: string
          graduation_year: number
          helsb_contract_url?: string | null
          id?: string
          rejected_reason?: string | null
          student_id: string
          university_id?: string | null
          university_id_url?: string | null
          university_name: string
          updated_at?: string
          user_id: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          created_at?: string
          graduation_year?: number
          helsb_contract_url?: string | null
          id?: string
          rejected_reason?: string | null
          student_id?: string
          university_id?: string | null
          university_id_url?: string | null
          university_name?: string
          updated_at?: string
          user_id?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "student_verifications_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "supported_universities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      support_contact_config: {
        Row: {
          call_enabled: boolean
          chat_enabled: boolean
          email_address: string | null
          email_enabled: boolean
          email_subject: string | null
          key: string
          phone_number: string | null
          updated_at: string
          updated_by_admin_user_id: string | null
        }
        Insert: {
          call_enabled?: boolean
          chat_enabled?: boolean
          email_address?: string | null
          email_enabled?: boolean
          email_subject?: string | null
          key?: string
          phone_number?: string | null
          updated_at?: string
          updated_by_admin_user_id?: string | null
        }
        Update: {
          call_enabled?: boolean
          chat_enabled?: boolean
          email_address?: string | null
          email_enabled?: boolean
          email_subject?: string | null
          key?: string
          phone_number?: string | null
          updated_at?: string
          updated_by_admin_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_contact_config_updated_by_admin_user_id_fkey"
            columns: ["updated_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      support_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          notification_error: string | null
          notification_id: string | null
          notification_status: Database["public"]["Enums"]["support_message_notification_status"]
          sender_admin_user_id: string | null
          sender_type: Database["public"]["Enums"]["support_message_sender_type"]
          sender_user_id: string | null
          ticket_id: string
          visibility: Database["public"]["Enums"]["support_message_visibility"]
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          notification_error?: string | null
          notification_id?: string | null
          notification_status?: Database["public"]["Enums"]["support_message_notification_status"]
          sender_admin_user_id?: string | null
          sender_type: Database["public"]["Enums"]["support_message_sender_type"]
          sender_user_id?: string | null
          ticket_id: string
          visibility?: Database["public"]["Enums"]["support_message_visibility"]
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          notification_error?: string | null
          notification_id?: string | null
          notification_status?: Database["public"]["Enums"]["support_message_notification_status"]
          sender_admin_user_id?: string | null
          sender_type?: Database["public"]["Enums"]["support_message_sender_type"]
          sender_user_id?: string | null
          ticket_id?: string
          visibility?: Database["public"]["Enums"]["support_message_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_sender_admin_user_id_fkey"
            columns: ["sender_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "admin_support_tickets_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_admin_reads: {
        Row: {
          admin_user_id: string
          last_read_at: string
          ticket_id: string
        }
        Insert: {
          admin_user_id: string
          last_read_at?: string
          ticket_id: string
        }
        Update: {
          admin_user_id?: string
          last_read_at?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_admin_reads_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_ticket_admin_reads_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "admin_support_tickets_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_admin_reads_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_admin_user_id: string | null
          assigned_at: string | null
          category: Database["public"]["Enums"]["support_ticket_category"]
          close_reason: string | null
          closed_at: string | null
          closed_by_admin_user_id: string | null
          created_at: string
          first_admin_reply_at: string | null
          id: string
          latest_admin_message_at: string | null
          latest_message_at: string
          latest_user_message_at: string | null
          priority: string
          status: Database["public"]["Enums"]["support_ticket_status"]
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_admin_user_id?: string | null
          assigned_at?: string | null
          category: Database["public"]["Enums"]["support_ticket_category"]
          close_reason?: string | null
          closed_at?: string | null
          closed_by_admin_user_id?: string | null
          created_at?: string
          first_admin_reply_at?: string | null
          id?: string
          latest_admin_message_at?: string | null
          latest_message_at?: string
          latest_user_message_at?: string | null
          priority?: string
          status?: Database["public"]["Enums"]["support_ticket_status"]
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_admin_user_id?: string | null
          assigned_at?: string | null
          category?: Database["public"]["Enums"]["support_ticket_category"]
          close_reason?: string | null
          closed_at?: string | null
          closed_by_admin_user_id?: string | null
          created_at?: string
          first_admin_reply_at?: string | null
          id?: string
          latest_admin_message_at?: string | null
          latest_message_at?: string
          latest_user_message_at?: string | null
          priority?: string
          status?: Database["public"]["Enums"]["support_ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_admin_user_id_fkey"
            columns: ["assigned_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_closed_by_admin_user_id_fkey"
            columns: ["closed_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      supported_universities: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          normalized_name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          normalized_name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          normalized_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      supported_university_aliases: {
        Row: {
          alias: string
          created_at: string
          id: string
          normalized_alias: string
          university_id: string
        }
        Insert: {
          alias: string
          created_at?: string
          id?: string
          normalized_alias: string
          university_id: string
        }
        Update: {
          alias?: string
          created_at?: string
          id?: string
          normalized_alias?: string
          university_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supported_university_aliases_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "supported_universities"
            referencedColumns: ["id"]
          },
        ]
      }
      suspensions: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          reason: string
          resolved_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          reason: string
          resolved_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          reason?: string
          resolved_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suspensions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "suspensions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "suspensions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "suspensions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "suspensions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      transaction_authorization_audit_events: {
        Row: {
          authorization_challenge_id: string | null
          biometric_credential_id: string | null
          created_at: string
          device_id: string | null
          event_type: Database["public"]["Enums"]["transaction_authorization_event_type"]
          financial_transaction_id: string | null
          id: string
          method:
            | Database["public"]["Enums"]["transaction_authorization_method"]
            | null
          outcome: Database["public"]["Enums"]["transaction_authorization_outcome"]
          reason_code: string | null
          request_metadata: Json
          user_id: string
        }
        Insert: {
          authorization_challenge_id?: string | null
          biometric_credential_id?: string | null
          created_at?: string
          device_id?: string | null
          event_type: Database["public"]["Enums"]["transaction_authorization_event_type"]
          financial_transaction_id?: string | null
          id?: string
          method?:
            | Database["public"]["Enums"]["transaction_authorization_method"]
            | null
          outcome: Database["public"]["Enums"]["transaction_authorization_outcome"]
          reason_code?: string | null
          request_metadata?: Json
          user_id: string
        }
        Update: {
          authorization_challenge_id?: string | null
          biometric_credential_id?: string | null
          created_at?: string
          device_id?: string | null
          event_type?: Database["public"]["Enums"]["transaction_authorization_event_type"]
          financial_transaction_id?: string | null
          id?: string
          method?:
            | Database["public"]["Enums"]["transaction_authorization_method"]
            | null
          outcome?: Database["public"]["Enums"]["transaction_authorization_outcome"]
          reason_code?: string | null
          request_metadata?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_authorization_audit_events_authorization_challenge_"
            columns: ["authorization_challenge_id"]
            isOneToOne: false
            referencedRelation: "transaction_authorization_challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_biometric_credential_id_"
            columns: ["biometric_credential_id"]
            isOneToOne: false
            referencedRelation: "biometric_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_financial_transaction_id"
            columns: ["financial_transaction_id"]
            isOneToOne: false
            referencedRelation: "admin_operator_review_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_financial_transaction_id"
            columns: ["financial_transaction_id"]
            isOneToOne: false
            referencedRelation: "admin_transaction_monitor_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_financial_transaction_id"
            columns: ["financial_transaction_id"]
            isOneToOne: false
            referencedRelation: "credit_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_audit_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      transaction_authorization_challenges: {
        Row: {
          biometric_credential_id: string | null
          challenge_payload: Json
          consumed_at: string | null
          created_at: string
          device_id: string
          expires_at: string
          fixed_charge_amount: number
          id: string
          idempotency_key: string
          nonce: string
          operation: string
          package_id: string
          payload_hash: string
          payout_amount: number
          principal_amount: number
          processing_fee: number
          total_repayable: number
          user_id: string
        }
        Insert: {
          biometric_credential_id?: string | null
          challenge_payload: Json
          consumed_at?: string | null
          created_at?: string
          device_id: string
          expires_at: string
          fixed_charge_amount: number
          id?: string
          idempotency_key: string
          nonce: string
          operation: string
          package_id: string
          payload_hash: string
          payout_amount: number
          principal_amount: number
          processing_fee: number
          total_repayable: number
          user_id: string
        }
        Update: {
          biometric_credential_id?: string | null
          challenge_payload?: Json
          consumed_at?: string | null
          created_at?: string
          device_id?: string
          expires_at?: string
          fixed_charge_amount?: number
          id?: string
          idempotency_key?: string
          nonce?: string
          operation?: string
          package_id?: string
          payload_hash?: string
          payout_amount?: number
          principal_amount?: number
          processing_fee?: number
          total_repayable?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_authorization_challenges_biometric_credential_id_fk"
            columns: ["biometric_credential_id"]
            isOneToOne: false
            referencedRelation: "biometric_credentials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_authorization_challenges_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "credit_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_authorization_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transaction_authorization_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_push_tokens: {
        Row: {
          created_at: string
          device_id: string
          expo_push_token: string
          id: string
          last_seen_at: string
          platform: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          expo_push_token: string
          id?: string
          last_seen_at?: string
          platform: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          expo_push_token?: string
          id?: string
          last_seen_at?: string
          platform?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_push_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string
          pin_required: boolean
          push_notifications_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          pin_required?: boolean
          push_notifications_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          pin_required?: boolean
          push_notifications_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      admin_account_control_impact_v: {
        Row: {
          account_control_id: string | null
          active_assignment_count: number | null
          assignment_count: number | null
          created_at: string | null
          is_active: boolean | null
          segment_id: string | null
          segment_name: string | null
          segment_type:
            | Database["public"]["Enums"]["account_segment_type"]
            | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_controls_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "account_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_credit_position_v: {
        Row: {
          available_credit: number | null
          calculated_at: string | null
          current_limit: number | null
          latest_limit_effective_from: string | null
          latest_limit_history_id: string | null
          latest_limit_reason:
            | Database["public"]["Enums"]["credit_limit_change_reason"]
            | null
          outstanding_balance: number | null
          user_id: string | null
          user_loan_account_id: string | null
        }
        Relationships: []
      }
      admin_employment_verification_queue_v: {
        Row: {
          created_at: string | null
          employer_name: string | null
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          full_name: string | null
          has_payslip: boolean | null
          id: string | null
          identity_kyc_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          job_title: string | null
          net_salary: number | null
          pay_day: number | null
          pay_frequency: Database["public"]["Enums"]["pay_frequency"] | null
          phone_number_masked: string | null
          status:
            | Database["public"]["Enums"]["employment_verification_status"]
            | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "employment_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_identity_kyc_queue_v: {
        Row: {
          created_at: string | null
          full_name: string | null
          has_required_documents: boolean | null
          id: string | null
          phone_number_masked: string | null
          rejected_reason: string | null
          updated_at: string | null
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kyc_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_ledger_accounts_v: {
        Row: {
          account_type:
            | Database["public"]["Enums"]["ledger_account_type"]
            | null
          created_at: string | null
          id: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          account_type?:
            | Database["public"]["Enums"]["ledger_account_type"]
            | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          account_type?:
            | Database["public"]["Enums"]["ledger_account_type"]
            | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_ledger_anomalies_v: {
        Row: {
          anomaly_code: string | null
          detected_at: string | null
          ledger_account_id: string | null
          ledger_entry_id: string | null
          message: string | null
          user_id: string | null
        }
        Relationships: []
      }
      admin_ledger_entries_v: {
        Row: {
          account_id: string | null
          account_type:
            | Database["public"]["Enums"]["ledger_account_type"]
            | null
          amount: number | null
          balance_after: number | null
          created_at: string | null
          entry_date: string | null
          entry_type: Database["public"]["Enums"]["ledger_entry_type"] | null
          id: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          account_type?:
            | Database["public"]["Enums"]["ledger_account_type"]
            | null
          amount?: number | null
          balance_after?: number | null
          created_at?: string | null
          entry_date?: string | null
          entry_type?: Database["public"]["Enums"]["ledger_entry_type"] | null
          id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          account_type?:
            | Database["public"]["Enums"]["ledger_account_type"]
            | null
          amount?: number | null
          balance_after?: number | null
          created_at?: string | null
          entry_date?: string | null
          entry_type?: Database["public"]["Enums"]["ledger_entry_type"] | null
          id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_loan_account_id"]
          },
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_accounts_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "ledger_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "admin_operator_review_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "admin_transaction_monitor_v"
            referencedColumns: ["transaction_id"]
          },
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "credit_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_mandate_batch_summary_v: {
        Row: {
          batch_id: string | null
          completed_at: string | null
          created_at: string | null
          exported_at: string | null
          failed_count: number | null
          item_count: number | null
          note: string | null
          processed_count: number | null
          rejected_count: number | null
          status:
            | Database["public"]["Enums"]["repayment_mandate_batch_status"]
            | null
          submitted_at: string | null
          total_amount: number | null
        }
        Relationships: []
      }
      admin_mandate_schedule_ready_v: {
        Row: {
          account_holder_name: string | null
          account_number_last4: string | null
          amount: number | null
          bank_name: string | null
          debit_date: string | null
          full_name: string | null
          loan_id: string | null
          loan_status: Database["public"]["Enums"]["loan_status"] | null
          mandate_id: string | null
          mandate_provider_reference: string | null
          mandate_status:
            | Database["public"]["Enums"]["direct_debit_status"]
            | null
          repayment_schedule_status:
            | Database["public"]["Enums"]["repayment_schedule_status"]
            | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_notice_receipts_v: {
        Row: {
          created_at: string | null
          failure_code: string | null
          failure_message: string | null
          id: string | null
          notice_id: string | null
          notice_status: Database["public"]["Enums"]["notice_status"] | null
          notice_title: string | null
          notification_created_at: string | null
          notification_id: string | null
          seen_at: string | null
          snapshot_id: string | null
          status: Database["public"]["Enums"]["notice_receipt_status"] | null
          updated_at: string | null
          user_full_name: string | null
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "notice_receipts_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "admin_notices_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_notice_id_fkey"
            columns: ["notice_id"]
            isOneToOne: false
            referencedRelation: "notices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_snapshot_id_fkey"
            columns: ["snapshot_id"]
            isOneToOne: false
            referencedRelation: "admin_notices_v"
            referencedColumns: ["snapshot_id"]
          },
          {
            foreignKeyName: "notice_receipts_snapshot_id_fkey"
            columns: ["snapshot_id"]
            isOneToOne: false
            referencedRelation: "notice_audience_snapshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notice_receipts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_notices_v: {
        Row: {
          action_route: string | null
          archived_at: string | null
          archived_by_admin_user_id: string | null
          audience_params: Json | null
          audience_type:
            | Database["public"]["Enums"]["notice_audience_type"]
            | null
          cancelled_at: string | null
          cancelled_by_admin_user_id: string | null
          created_at: string | null
          failed_count: number | null
          first_seen_at: string | null
          id: string | null
          latest_seen_at: string | null
          message: string | null
          notification_created_count: number | null
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null
          published_at: string | null
          published_by_admin_user_id: string | null
          receipt_count: number | null
          seen_count: number | null
          snapshot_id: string | null
          snapshot_recipient_count: number | null
          snapshot_resolved_at: string | null
          snapshot_resolved_by_admin_user_id: string | null
          status: Database["public"]["Enums"]["notice_status"] | null
          summary: string | null
          title: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notice_audience_snapshots_resolved_by_admin_user_id_fkey"
            columns: ["snapshot_resolved_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notices_archived_by_admin_user_id_fkey"
            columns: ["archived_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notices_cancelled_by_admin_user_id_fkey"
            columns: ["cancelled_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notices_published_by_admin_user_id_fkey"
            columns: ["published_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_notification_delivery_monitor_v: {
        Row: {
          attempt_count: number | null
          category: Database["public"]["Enums"]["notification_category"] | null
          channel:
            | Database["public"]["Enums"]["notification_delivery_channel"]
            | null
          delivered_at: string | null
          delivery_id: string | null
          error_message: string | null
          last_attempted_at: string | null
          max_attempts: number | null
          notification_id: string | null
          notification_title: string | null
          notification_type:
            | Database["public"]["Enums"]["notification_type"]
            | null
          provider_message_id: string | null
          skipped_reason: string | null
          status:
            | Database["public"]["Enums"]["notification_delivery_status"]
            | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_deliveries_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_deliveries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_onboarding_funnel_v: {
        Row: {
          identity_approved: number | null
          phone_verified: number | null
          secondary_approved: number | null
          signed_up: number | null
          signup_date: string | null
        }
        Relationships: []
      }
      admin_operator_review_v: {
        Row: {
          created_at: string | null
          failure_code: string | null
          full_name: string | null
          provider_status:
            | Database["public"]["Enums"]["disbursement_provider_status"]
            | null
          requires_operator_review: boolean | null
          review_code: string | null
          transaction_id: string | null
          transaction_status:
            | Database["public"]["Enums"]["credit_transaction_status"]
            | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_policy_documents_v: {
        Row: {
          archived_version_count: number | null
          created_at: string | null
          created_by_admin_user_id: string | null
          default_title: string | null
          description: string | null
          draft_version_count: number | null
          id: string | null
          is_active: boolean | null
          key: Database["public"]["Enums"]["policy_document_key"] | null
          latest_version_created_at: string | null
          published_at: string | null
          published_by_admin_user_id: string | null
          published_effective_at: string | null
          published_title: string | null
          published_version_id: string | null
          published_version_number: number | null
          updated_at: string | null
          updated_by_admin_user_id: string | null
          version_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_documents_created_by_admin_user_id_fkey"
            columns: ["created_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "policy_documents_updated_by_admin_user_id_fkey"
            columns: ["updated_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "policy_versions_published_by_admin_user_id_fkey"
            columns: ["published_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_student_verification_queue_v: {
        Row: {
          created_at: string | null
          full_name: string | null
          graduation_year: number | null
          has_documents: boolean | null
          id: string | null
          identity_kyc_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          phone_number_masked: string | null
          rejected_reason: string | null
          student_id: string | null
          supported_university_name: string | null
          university_is_active: boolean | null
          university_name: string | null
          updated_at: string | null
          user_id: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_support_messages_v: {
        Row: {
          assigned_admin_user_id: string | null
          body: string | null
          created_at: string | null
          id: string | null
          notification_error: string | null
          notification_id: string | null
          notification_status:
            | Database["public"]["Enums"]["support_message_notification_status"]
            | null
          sender_admin_user_id: string | null
          sender_type:
            | Database["public"]["Enums"]["support_message_sender_type"]
            | null
          sender_user_full_name: string | null
          sender_user_id: string | null
          ticket_id: string | null
          ticket_status:
            | Database["public"]["Enums"]["support_ticket_status"]
            | null
          ticket_user_full_name: string | null
          ticket_user_id: string | null
          visibility:
            | Database["public"]["Enums"]["support_message_visibility"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_sender_admin_user_id_fkey"
            columns: ["sender_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "admin_support_tickets_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_assigned_admin_user_id_fkey"
            columns: ["assigned_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["ticket_user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["ticket_user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["ticket_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["ticket_user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["ticket_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_support_tickets_v: {
        Row: {
          assigned_admin_user_id: string | null
          assigned_at: string | null
          category:
            | Database["public"]["Enums"]["support_ticket_category"]
            | null
          close_reason: string | null
          closed_at: string | null
          closed_by_admin_user_id: string | null
          created_at: string | null
          first_admin_reply_at: string | null
          id: string | null
          internal_message_count: number | null
          is_broadcast: boolean | null
          latest_admin_message_at: string | null
          latest_message_at: string | null
          latest_public_message_at: string | null
          latest_user_message_at: string | null
          message_count: number | null
          priority: string | null
          public_message_count: number | null
          status: Database["public"]["Enums"]["support_ticket_status"] | null
          subject: string | null
          updated_at: string | null
          user_full_name: string | null
          user_id: string | null
          user_phone_number_masked: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
          viewer_has_unread: boolean | null
          viewer_last_read_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_admin_user_id_fkey"
            columns: ["assigned_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_closed_by_admin_user_id_fkey"
            columns: ["closed_by_admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_transaction_monitor_v: {
        Row: {
          amount: number | null
          created_at: string | null
          failure_code: string | null
          fixed_charge_amount: number | null
          full_name: string | null
          loan_id: string | null
          payout_amount: number | null
          principal_amount: number | null
          processing_fee: number | null
          provider: string | null
          provider_status:
            | Database["public"]["Enums"]["disbursement_provider_status"]
            | null
          requires_operator_review: boolean | null
          status:
            | Database["public"]["Enums"]["credit_transaction_status"]
            | null
          total_repayable: number | null
          transaction_id: string | null
          transaction_type:
            | Database["public"]["Enums"]["credit_transaction_type"]
            | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "admin_mandate_schedule_ready_v"
            referencedColumns: ["loan_id"]
          },
          {
            foreignKeyName: "credit_transactions_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_credit_position_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_ledger_anomalies_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_detail_summary_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_user_directory_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      admin_user_detail_summary_v: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          employment_verification_status:
            | Database["public"]["Enums"]["employment_verification_status"]
            | null
          full_name: string | null
          identity_kyc_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          legal_name: string | null
          mandate_status:
            | Database["public"]["Enums"]["direct_debit_status"]
            | null
          phone_number_masked: string | null
          phone_verified_at: string | null
          student_verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          updated_at: string | null
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      admin_user_directory_v: {
        Row: {
          account_state: string | null
          active_control_count: number | null
          active_suspension: boolean | null
          created_at: string | null
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          full_name: string | null
          identity_kyc_status: string | null
          phone_number_masked: string | null
          phone_verified_at: string | null
          search_text: string | null
          secondary_kyc_status: string | null
          supported_university_name: string | null
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      published_policies_v: {
        Row: {
          effective_at: string | null
          eyebrow: string | null
          footer_note: string | null
          policy_key: Database["public"]["Enums"]["policy_document_key"] | null
          policy_version_id: string | null
          published_at: string | null
          sections: Json | null
          summary: string | null
          title: string | null
          updated_at: string | null
          version_number: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      apply_repayment_mandate_results: {
        Args: {
          p_actor_admin_user_id: string
          p_file_name: string
          p_rows: Json
        }
        Returns: string
      }
      assert_manual_repayment_allowed: {
        Args: { p_loan_id: string }
        Returns: undefined
      }
      assign_credit_limit: {
        Args: {
          p_actor_admin_user_id: string
          p_idempotency_key: string
          p_new_limit: number
          p_note: string
          p_reason: Database["public"]["Enums"]["credit_limit_change_reason"]
          p_target_user_id: string
        }
        Returns: {
          available_credit: number
          credit_limit_history_id: string
          new_limit: number
          outstanding_balance: number
          previous_limit: number
          target_user_id: string
          user_loan_account_id: string
        }[]
      }
      claim_and_insert_admin_support_reply: {
        Args: {
          p_actor_admin_user_id: string
          p_body: string
          p_ticket_id: string
        }
        Returns: {
          assigned_admin_user_id: string
          support_message_id: string
          support_ticket_id: string
          ticket_status: Database["public"]["Enums"]["support_ticket_status"]
        }[]
      }
      create_repayment_mandate_batch: {
        Args: {
          p_actor_admin_user_id: string
          p_loan_ids: string[]
          p_note?: string
        }
        Returns: string
      }
      current_admin_role: {
        Args: never
        Returns: Database["public"]["Enums"]["admin_role"]
      }
      freeze_supported_university: {
        Args: {
          p_ends_at?: string
          p_freeze_type: string
          p_reason: string
          p_university_id: string
          p_user_message: string
        }
        Returns: Json
      }
      get_trusted_credit_position: {
        Args: { p_create_user_loan_account?: boolean; p_target_user_id: string }
        Returns: {
          available_credit: number
          current_limit: number
          latest_limit_history_id: string
          outstanding_balance: number
          result_code: string
          target_user_id: string
          user_loan_account_id: string
        }[]
      }
      is_active_admin: { Args: never; Returns: boolean }
      mark_notice_seen_for_notification: {
        Args: { p_notification_id: string }
        Returns: boolean
      }
      mark_repayment_mandate_batch_exported: {
        Args: { p_batch_id: string }
        Returns: boolean
      }
      mark_repayment_mandate_batch_submitted: {
        Args: { p_batch_id: string }
        Returns: boolean
      }
      mask_phone: { Args: { p_phone: string }; Returns: string }
      post_draw_disbursement: {
        Args: {
          p_authorization_audit_event_id: string
          p_authorization_method: Database["public"]["Enums"]["transaction_authorization_method"]
          p_idempotency_key: string
          p_package_id: string
          p_provider_reference: string
          p_provider_response?: Json
          p_user_id: string
        }
        Returns: {
          available_credit: number
          loan_id: string
          outstanding_balance: number
          transaction_id: string
        }[]
      }
      post_processed_repayment_mandate_instruction: {
        Args: { p_batch_item_id: string }
        Returns: string
      }
      preview_notice_audience: {
        Args: {
          p_audience_params?: Json
          p_audience_type: Database["public"]["Enums"]["notice_audience_type"]
        }
        Returns: {
          recipient_count: number
          sample_full_name: string
          sample_user_id: string
          sample_user_type: Database["public"]["Enums"]["user_type"]
        }[]
      }
      refresh_loan_repayment_schedule_state: {
        Args: { p_loan_id: string }
        Returns: undefined
      }
      remove_repayment_mandate_batch_item: {
        Args: { p_batch_id: string; p_item_id: string }
        Returns: boolean
      }
      resolve_notice_audience: {
        Args: {
          p_audience_params?: Json
          p_audience_type: Database["public"]["Enums"]["notice_audience_type"]
        }
        Returns: {
          full_name: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }[]
      }
      text_array_has_no_blank_values: {
        Args: { p_values: string[] }
        Returns: boolean
      }
      unfreeze_supported_university: {
        Args: { p_control_id: string; p_university_id: string }
        Returns: Json
      }
    }
    Enums: {
      account_control_level: "standard_hold" | "strong_hold"
      account_segment_type: "supported_university" | "government_employment"
      admin_role: "super_admin" | "credit_ops" | "risk_ops" | "support"
      credit_limit_change_reason:
        | "initial_manual_assignment"
        | "manual_increase"
        | "manual_decrease"
        | "risk_review"
        | "repayment_history_review"
        | "correction"
      credit_transaction_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "reversed"
      credit_transaction_type:
        | "disbursement"
        | "repayment"
        | "fee"
        | "interest_accrual"
        | "reversal"
      direct_debit_status: "pending" | "active" | "cancelled" | "suspended"
      disbursement_provider_status:
        | "not_started"
        | "processing"
        | "succeeded"
        | "retryable_failed"
        | "permanent_failed"
      employment_type: "full_time" | "part_time" | "contract" | "government"
      employment_verification_status: "pending" | "approved" | "rejected"
      ledger_account_type:
        | "user_loan"
        | "user_wallet"
        | "system_cash"
        | "system_interest"
        | "system_fees"
      ledger_entry_type: "debit" | "credit"
      loan_status: "active" | "paid" | "overdue" | "defaulted" | "restructured"
      notice_audience_type:
        | "all_users"
        | "user_type"
        | "supported_university"
        | "account_segment"
        | "explicit_users"
      notice_receipt_status: "pending" | "notification_created" | "failed"
      notice_status: "draft" | "published" | "archived" | "cancelled"
      notification_category:
        | "kyc"
        | "credit"
        | "repayment"
        | "security"
        | "system"
        | "notice"
        | "support"
      notification_delivery_channel: "push" | "sms"
      notification_delivery_status:
        | "queued"
        | "processing"
        | "delivered"
        | "skipped"
        | "retrying"
        | "failed"
      notification_type: "in_app" | "push" | "sms" | "push_sms"
      pay_frequency: "weekly" | "biweekly" | "monthly"
      policy_document_key: "terms" | "privacy" | "licences" | "cookies"
      policy_version_status: "draft" | "published" | "archived"
      repayment_mandate_batch_status:
        | "draft"
        | "exported"
        | "submitted"
        | "completed"
        | "partially_completed"
      repayment_mandate_instruction_status:
        | "draft"
        | "exported"
        | "scheduled"
        | "processed"
        | "failed"
        | "rejected"
      repayment_schedule_status:
        | "unscheduled"
        | "partially_scheduled"
        | "scheduled"
        | "partially_processed"
        | "processed"
      support_message_notification_status:
        | "not_required"
        | "pending"
        | "created"
        | "failed"
      support_message_sender_type: "user" | "admin" | "system" | "ai"
      support_message_visibility: "public" | "internal"
      support_ticket_category:
        | "account"
        | "credit"
        | "repayment"
        | "kyc"
        | "technical"
        | "security"
        | "other"
      support_ticket_status: "open" | "waiting_for_user" | "closed"
      transaction_authorization_event_type:
        | "pin_created"
        | "biometric_enrolled"
        | "draw_authorization"
      transaction_authorization_method: "pin" | "biometric"
      transaction_authorization_outcome: "succeeded" | "failed" | "cancelled"
      user_type: "student" | "salaried"
      verification_status: "pending" | "approved" | "rejected"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      account_control_level: ["standard_hold", "strong_hold"],
      account_segment_type: ["supported_university", "government_employment"],
      admin_role: ["super_admin", "credit_ops", "risk_ops", "support"],
      credit_limit_change_reason: [
        "initial_manual_assignment",
        "manual_increase",
        "manual_decrease",
        "risk_review",
        "repayment_history_review",
        "correction",
      ],
      credit_transaction_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "reversed",
      ],
      credit_transaction_type: [
        "disbursement",
        "repayment",
        "fee",
        "interest_accrual",
        "reversal",
      ],
      direct_debit_status: ["pending", "active", "cancelled", "suspended"],
      disbursement_provider_status: [
        "not_started",
        "processing",
        "succeeded",
        "retryable_failed",
        "permanent_failed",
      ],
      employment_type: ["full_time", "part_time", "contract", "government"],
      employment_verification_status: ["pending", "approved", "rejected"],
      ledger_account_type: [
        "user_loan",
        "user_wallet",
        "system_cash",
        "system_interest",
        "system_fees",
      ],
      ledger_entry_type: ["debit", "credit"],
      loan_status: ["active", "paid", "overdue", "defaulted", "restructured"],
      notice_audience_type: [
        "all_users",
        "user_type",
        "supported_university",
        "account_segment",
        "explicit_users",
      ],
      notice_receipt_status: ["pending", "notification_created", "failed"],
      notice_status: ["draft", "published", "archived", "cancelled"],
      notification_category: [
        "kyc",
        "credit",
        "repayment",
        "security",
        "system",
        "notice",
        "support",
      ],
      notification_delivery_channel: ["push", "sms"],
      notification_delivery_status: [
        "queued",
        "processing",
        "delivered",
        "skipped",
        "retrying",
        "failed",
      ],
      notification_type: ["in_app", "push", "sms", "push_sms"],
      pay_frequency: ["weekly", "biweekly", "monthly"],
      policy_document_key: ["terms", "privacy", "licences", "cookies"],
      policy_version_status: ["draft", "published", "archived"],
      repayment_mandate_batch_status: [
        "draft",
        "exported",
        "submitted",
        "completed",
        "partially_completed",
      ],
      repayment_mandate_instruction_status: [
        "draft",
        "exported",
        "scheduled",
        "processed",
        "failed",
        "rejected",
      ],
      repayment_schedule_status: [
        "unscheduled",
        "partially_scheduled",
        "scheduled",
        "partially_processed",
        "processed",
      ],
      support_message_notification_status: [
        "not_required",
        "pending",
        "created",
        "failed",
      ],
      support_message_sender_type: ["user", "admin", "system", "ai"],
      support_message_visibility: ["public", "internal"],
      support_ticket_category: [
        "account",
        "credit",
        "repayment",
        "kyc",
        "technical",
        "security",
        "other",
      ],
      support_ticket_status: ["open", "waiting_for_user", "closed"],
      transaction_authorization_event_type: [
        "pin_created",
        "biometric_enrolled",
        "draw_authorization",
      ],
      transaction_authorization_method: ["pin", "biometric"],
      transaction_authorization_outcome: ["succeeded", "failed", "cancelled"],
      user_type: ["student", "salaried"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
